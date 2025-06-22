import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config"; // Adjust path as needed
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [totalGeoites, setTotalGeoites] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // General error messages for non-modal form validation
  const [successMessage, setSuccessMessage] = useState(null);

  // States for editable fields (used in modals)
  const [newUsernameInput, setNewUsernameInput] = useState("");
  const [newEmailInput, setNewEmailInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // For re-authentication input, always present
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState("");

  // States to control modal visibility
  const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  // Error specific to the re-authentication step (now used for all modal validation errors)
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "N/A");
        setEmail(user.email || "N/A");
        setNewUsernameInput(user.displayName || ""); // Initialize input with current username
        setNewEmailInput(user.email || ""); // Initialize input with current email
        fetchUserGeoites(user.uid);
      } else {
        setUsername("N/A");
        setEmail("N/A");
        setTotalGeoites(0);
        setLoading(false);
        setError("Please log in or register to view your profile.");
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchUserGeoites = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const geoitesCollectionRef = collection(db, "geoites");
      const q = query(geoitesCollectionRef, where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      setTotalGeoites(querySnapshot.size);
    } catch (err) {
      console.error("Error fetching geoites:", err);
      setError("Failed to load AR objects count. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear general error
    setSuccessMessage(null);

    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("You must be logged in to update your profile.");
      return;
    }
    if (newUsernameInput.trim() === "") {
      setErrorMessage("Username cannot be empty.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: newUsernameInput,
      });
      setUsername(newUsernameInput); // Update displayed username
      setSuccessMessage("Username updated successfully!");
      setIsEditUsernameModalOpen(false); // Close modal on success
    } catch (err) {
      console.error("Error updating username:", err);
      setErrorMessage("Failed to update username. Please try again.");
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setSuccessMessage(null); // Clear success message
    setModalError(null); // Clear modal-specific error

    const user = auth.currentUser;
    if (!user) {
      setModalError("You must be logged in to update your email.");
      return;
    }

    if (newEmailInput.trim() === "" || !newEmailInput.includes("@")) {
      setModalError("Please enter a valid email address.");
      return;
    }
    if (newEmailInput === user.email) {
      setModalError("New email cannot be the same as current email.");
      return;
    }
    if (!currentPassword) {
      setModalError(
        "Please enter your current password for re-authentication."
      );
      return;
    }

    try {
      // Step 1: Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Step 2: If re-authentication is successful, proceed with email update
      await updateEmail(user, newEmailInput);
      setEmail(newEmailInput); // Update displayed email
      setSuccessMessage(
        "Email updated successfully! Please re-login with your new email."
      );
      setIsEditEmailModalOpen(false); // Close email edit modal
      setCurrentPassword(""); // Clear current password
      setNewEmailInput(user.email); // Reset input to updated email
      await signOut(auth); // Sign out to force re-login with new credentials
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Email update error:", err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setModalError("Invalid current password. Please try again.");
      } else if (err.code === "auth/email-already-in-use") {
        setModalError("This email is already in use by another account.");
      } else if (err.code === "auth/invalid-email") {
        setModalError("The new email address is invalid.");
      } else if (err.code === "auth/user-disabled") {
        setModalError("Your account has been disabled.");
      } else if (err.code === "auth/requires-recent-login") {
        // This should theoretically not be hit if current password is provided upfront
        setModalError(
          "This operation requires recent authentication. Please re-enter your current password."
        );
      } else if (err.code === "auth/operation-not-allowed") {
        setModalError(
          'Email update blocked. Please check Firebase Authentication settings (e.g., "Email enumeration protection").'
        );
      } else {
        setModalError("Failed to update email. Please try again.");
      }
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setSuccessMessage(null); // Clear success message
    setModalError(null); // Clear modal-specific error

    const user = auth.currentUser;
    if (!user) {
      setModalError("You must be logged in to update your password.");
      return;
    }

    if (newPasswordInput.length < 6) {
      setModalError("New password must be at least 6 characters long.");
      return;
    }
    if (newPasswordInput !== confirmNewPasswordInput) {
      setModalError("New passwords do not match.");
      return;
    }
    if (!currentPassword) {
      setModalError(
        "Please enter your current password for re-authentication."
      );
      return;
    }

    try {
      // Step 1: Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Step 2: If re-authentication is successful, proceed with password update
      await updatePassword(user, newPasswordInput);
      setSuccessMessage(
        "Password updated successfully! Please re-login with your new password."
      );
      setIsChangePasswordModalOpen(false); // Close password change modal
      setNewPasswordInput(""); // Clear password fields
      setConfirmNewPasswordInput("");
      setCurrentPassword(""); // Clear current password
      await signOut(auth); // Sign out to force re-login with new credentials
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Password update error:", err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setModalError("Invalid current password. Please try again.");
      } else if (err.code === "auth/weak-password") {
        setModalError("The new password is too weak.");
      } else if (err.code === "auth/user-disabled") {
        setModalError("Your account has been disabled.");
      } else if (err.code === "auth/requires-recent-login") {
        // This should theoretically not be hit if current password is provided upfront
        setModalError(
          "This operation requires recent authentication. Please re-enter your current password."
        );
      } else {
        setModalError("Failed to update password. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Your Profile
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">
            <p>Loading profile data...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mt-4"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-4">
            <p className="font-semibold">{error}</p>
            {!auth.currentUser && (
              <div className="mt-4 flex flex-col space-y-2 items-center">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login Here
                </Link>
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Register Now
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message Display */}
            {successMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{successMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                  onClick={() => setSuccessMessage(null)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.15a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.15 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            {/* General Error Message Display */}
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{errorMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                  onClick={() => setErrorMessage(null)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.15a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.15 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}

            {/* Username Display with Edit Icon */}
            <div className="flex items-center p-3 bg-gray-50 rounded-md justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-500 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {username}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsEditUsernameModalOpen(true);
                  setErrorMessage(null); // Clear errors when opening
                  setSuccessMessage(null); // Clear success when opening
                }}
                className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
                aria-label="Edit Username"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V7.5a2.25 2.25 0 0 1 2.25-2.25h4.5"
                  />
                </svg>
              </button>
            </div>

            {/* Email Display with Edit Icon */}
            <div className="flex items-center p-3 bg-gray-50 rounded-md justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-500 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsEditEmailModalOpen(true);
                  setErrorMessage(null); // Clear errors when opening
                  setSuccessMessage(null); // Clear success when opening
                  setModalError(null); // Clear modal-specific error when opening
                  setCurrentPassword(""); // Clear current password input
                }}
                className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
                aria-label="Edit Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V7.5a2.25 2.25 0 0 1 2.25-2.25h4.5"
                  />
                </svg>
              </button>
            </div>

            {/* Password Change Button */}
            <div className="flex items-center p-3 bg-gray-50 rounded-md justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-500 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-500">Password</p>
              </div>
              <button
                onClick={() => {
                  setIsChangePasswordModalOpen(true);
                  setErrorMessage(null); // Clear errors when opening
                  setSuccessMessage(null); // Clear success when opening
                  setModalError(null); // Clear modal-specific error when opening
                  setNewPasswordInput("");
                  setConfirmNewPasswordInput("");
                  setCurrentPassword(""); // Clear current password input
                }}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Change Password
              </button>
            </div>

            {/* Total AR Objects Display */}
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-indigo-500 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5H13.5M12 19.5v-2.25m-4.5 0h9"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total AR Geoites
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalGeoites}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Modals for Editing Profile Info --- */}

      {/* Edit Username Modal */}
      {isEditUsernameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">
              Change Username
            </h3>
            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div>
                <label
                  htmlFor="newUsernameInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Username:
                </label>
                <input
                  type="text"
                  id="newUsernameInput"
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>
              {errorMessage && ( // Display general error message if any
                <p className="text-red-500 text-sm text-center">
                  {errorMessage}
                </p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditUsernameModalOpen(false);
                    setErrorMessage(null); // Clear error on cancel
                    setNewUsernameInput(username); // Reset input to current username
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Email Modal */}
      {isEditEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">
              Change Email
            </h3>

            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label
                  htmlFor="newEmailInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Email:
                </label>
                <input
                  type="email"
                  id="newEmailInput"
                  value={newEmailInput}
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>

              {/* Current Password for Re-authentication (always present) */}
              <div className="mt-4">
                <label
                  htmlFor="currentPasswordEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password:
                </label>
                <input
                  type="password"
                  id="currentPasswordEmail"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>

              {modalError && ( // Display modal-specific error message if any
                <p className="text-red-500 text-sm text-center">{modalError}</p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditEmailModalOpen(false);
                    setModalError(null); // Clear errors on cancel
                    setNewEmailInput(email); // Reset input to current email
                    setCurrentPassword(""); // Clear current password input
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">
              Change Password
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="newPasswordInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password (min 6 chars):
                </label>
                <input
                  type="password"
                  id="newPasswordInput"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmNewPasswordInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  id="confirmNewPasswordInput"
                  value={confirmNewPasswordInput}
                  onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>

              {/* Current Password for Re-authentication (always present) */}
              <div className="mt-4">
                <label
                  htmlFor="currentPasswordPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password:
                </label>
                <input
                  type="password"
                  id="currentPasswordPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>

              {modalError && ( // Display modal-specific error message if any
                <p className="text-red-500 text-sm text-center">{modalError}</p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangePasswordModalOpen(false);
                    setModalError(null); // Clear errors on cancel
                    setNewPasswordInput("");
                    setConfirmNewPasswordInput("");
                    setCurrentPassword(""); // Clear current password input
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
