import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";

function Navbar() {
  // State variable to track whether the navbar is toggled or not
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Function to toggle the navbar state
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Function to handle link click and close the navbar
  const handleLinkClick = () => {
    setIsNavbarOpen(false);
    setIsNavbarOpen(!isNavbarOpen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Call this function when the login button is clicked
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    // Display a confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    // If the user confirms, proceed with the logout
    if (confirmLogout) {
      try {
        await auth.signOut();
        console.log("Logout successful"); // Log the success message
        setIsLoggedIn(false);
        navigate("/"); // Navigate to home after successful logout
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    }
    // If the user cancels, do nothing and stay on the same page
  };

  return (
    <nav className="sticky top-0 z-50">
      <nav className={`navbar ${isNavbarOpen ? "open" : ""}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/app icon.png" className="h-10" alt="AR-ITE" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              Geo-ITE
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={isLoggedIn ? handleLogout : handleLoginClick}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isNavbarOpen ? "true" : "false"}
              onClick={toggleNavbar}
            >
              <span className="sr-only">Open main menu</span>
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
          <div
            className={`items-center justify-between w-full ${
              isNavbarOpen ? "block" : "hidden"
            } md:flex md:w-auto md:order-1 transition-all duration-300`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleLinkClick}
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
    </nav>
  );
}

export default Navbar;
