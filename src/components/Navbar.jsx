import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Ensure this path is correct
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config"; // Ensure this path is correct for your Firebase config

function Navbar() {
  // State variable to track whether the navbar is toggled for mobile view
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  // State variable to track user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // New state for the logout success modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  // useEffect hook to listen for Firebase authentication state changes
  // This helps determine if a user is logged in or out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });

    // Cleanup function: unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to toggle the mobile navbar's open/close state
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Function to handle navigation link clicks: closes the mobile navbar and scrolls to top
  const handleLinkClick = () => {
    setIsNavbarOpen(false); // Close the navbar
    // If you intend to toggle it again, this line 'setIsNavbarOpen(!isNavbarOpen);' is redundant
    // as it would immediately re-open the navbar after closing it.
    // For a smooth close-on-click, just setIsNavbarOpen(false) is sufficient.
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  // Function to handle login button click: navigates to the login page
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page route
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
  };

  // Function to handle logout: signs out the user from Firebase
  const handleLogout = async () => {
    // Display a confirmation dialog to the user before logging out
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    // If the user confirms the logout
    if (confirmLogout) {
      try {
        await auth.signOut(); // Perform Firebase sign-out operation
        console.log("Logout successful"); // Log success to console
        setIsLoggedIn(false); // Update local state to reflect logout
        setIsLogoutModalOpen(true); // Open the logout success modal
      } catch (error) {
        console.error("Error signing out:", error.message); // Log any errors
        // Optionally, you could display an error message to the user here
      }
    }
    // If the user cancels the logout, do nothing
  };

  // Function to close the logout success modal and navigate home
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false); // Close the modal
    navigate("/"); // Navigate to the home page
    window.scrollTo({ top: 0, behavior: "smooth" }); // This line ensures scrolling to the top
  };

  return (
    // Outer nav for sticky positioning and z-index
    <nav className="sticky top-0 z-50">
      {/* Main navbar structure, conditionally applies 'open' class for mobile responsiveness */}
      <nav className={`navbar ${isNavbarOpen ? "open" : ""}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Brand/Logo link */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/app icon.png" className="h-10" alt="AR-ITE" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              Geo-ITE
            </span>
          </Link>

          {/* Login/Logout Button and Mobile Menu Toggle */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              // Dynamically sets onClick based on login status (Logout if logged in, Login if not)
              onClick={isLoggedIn ? handleLogout : handleLoginClick}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoggedIn ? "Logout" : "Login"} {/* Button text changes */}
            </button>

            {/* Mobile menu toggle button (Hamburger/X icon) */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isNavbarOpen ? "true" : "false"}
              onClick={toggleNavbar} // Toggles mobile navbar state
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon (shown when navbar is closed) */}
              <svg
                className={`w-5 h-5 ${isNavbarOpen ? "hidden" : "block"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              {/* X icon (shown when navbar is open) - Note: This is currently a hamburger, not an X.
                  You might want to change the SVG path for an 'X' to indicate close. */}
              <svg
                className={`w-5 h-5 ${isNavbarOpen ? "block" : "hidden"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 3a1 1 0 011-1h16a1 1 0 110 2H2a1 1 0 01-1-1zM1 9a1 1 0 011-1h16a1 1 0 110 2H2a1 1 0 01-1-1zM2 15a1 1 0 100 2h16a1 1 0 100-2H2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Main navigation links container */}
          <div
            className={`items-center justify-between w-full ${
              isNavbarOpen ? "block" : "hidden" // Shows/hides based on mobile navbar state
            } md:flex md:w-auto md:order-1 transition-all duration-300`} // Tailwind for responsive and transition
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick} // Closes navbar and scrolls on click
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/create"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
                >
                  CreateAR
                </Link>
              </li>

              {/* This section is commented out in your original code, retaining it as-is */}
              {/* <li>
                <Link
                  to="/make"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
                >
                  MakeAR
                </Link>
              </li> */}

              <li>
                <Link
                  to="/arobjects"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
                >
                  AR-Objects
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              {/* This section is commented out in your original code, retaining it as-is */}
              {/* <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Success Modal: This modal will appear when isLogoutModalOpen is true */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg text-center">
            {/* Success icon */}
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
            {/* Modal title */}
            <h2 className="text-2xl font-bold mb-3 text-green-700">
              Logged Out Successfully!
            </h2>
            {/* Modal message */}
            <p className="text-gray-700 mb-6">
              You have successfully logged out of your account.
            </p>
            {/* Close button for the modal */}
            <button
              onClick={closeLogoutModal} // Calls function to close modal and navigate
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
