import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the success modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    // Client-side password mismatch check
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Update the user's profile with the provided username
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      console.log("User registered successfully:", userCredential.user);
      setIsModalOpen(true); // Open the success modal

      // The navigation will now happen *after* the user closes the modal
      // or after a brief delay if you prefer an automatic redirect.
      // For this implementation, navigation happens when the modal is closed.
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle Firebase specific errors and provide user-friendly messages
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email is already in use. Please use a different email or log in."
          );
          break;
        case "auth/invalid-email":
          setErrorMessage("The email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage(
            "Email/password accounts are not enabled in Firebase."
          );
          break;
        case "auth/weak-password":
          setErrorMessage(
            "Password is too weak. It must be at least 6 characters long."
          );
          break;
        default:
          setErrorMessage(
            "An unexpected error occurred during signup. Please try again later."
          );
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate to home page after modal is closed
    navigateTo("/");
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div></div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center"></div>
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleRegister}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {/* Error Message Display */}
                    {errorMessage && (
                      <p className="text-red-500 text-center mt-4 text-sm font-medium">
                        {errorMessage}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>

                  {/* Success Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg text-center">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                          <svg
                            className="h-10 w-10 text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-green-700">
                          Registration Successful!
                        </h2>
                        <p className="text-gray-700 mb-6">
                          Your account has been successfully created. You can
                          now log in and explore our features!
                        </p>
                        <button
                          onClick={closeModal}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
                        >
                          Continue to Home
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>

                  <p className="mt-3 text-xl text-gray-600 text-center font-extrabold">
                    Or
                  </p>

                  <p className="mt-3 text-xs text-gray-600 text-center">
                    Already have an account?&nbsp;
                    <Link
                      to="/login"
                      className="border-b border-gray-500 border-dotted"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Click Here
                    </Link>
                    &nbsp;to Login
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
