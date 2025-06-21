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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      console.log("User registered successfully:", userCredential.user);
      setIsModalOpen(true); // Open the modal on successful registration

      // After successful registration, navigate to the login page
      navigateTo("/login"); // Replace "/login" with the actual path to your login page
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error (e.g., show an error message).
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Redirect the user to the home page here
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                className="w-32 mx-auto"
                alt="Logo"
              />
            </div>
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
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
                  {isModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg
                                  className="h-6 w-6 text-green-600"
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
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  Signup Success!
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              onClick={closeModal}
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Close
                            </button>
                          </div>
                        </div>
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
