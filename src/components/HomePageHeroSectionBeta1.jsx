import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePageHeroSectionBeta1 = () => {
  // State to control the visibility of the video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Function to open the video modal
  const openVideoModal = (e) => {
    e.preventDefault(); // Prevent the default anchor tag behavior (navigating away)
    setIsVideoModalOpen(true);
  };

  // Function to close the video modal
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  // IMPORTANT: Replace this with your actual YouTube video EMBED URL.
  // To get the embed URL: Go to your YouTube video -> click "Share" -> "Embed" -> Copy the src from the <iframe> tag.
  // Example for a real video: "http://www.youtube.com/embed/YOUR_VIDEO_ID"
  // For the 'rickroll' link you previously provided, the embed URL is:
  const youtubeEmbedUrl = "https://youtu.be/qsh7ttnp3RU?si=42Id8NYhNXjkePnP"; // This is the actual embed URL for "Never Gonna Give You Up"

  return (
    <div>
      <section className=" sm:pt-24 lg:pt-32 sm:pb-24 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold t text-gray-200 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Start your Journey </span>
              <span className="block text-indigo-600 xl:inline">with AR</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            {/* */}
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to="/create"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
                  scroll={true} // Add this prop to enable scrolling to top
                >
                  Get started
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                {/* This link now triggers the video modal */}
                <a
                  href="#" // Prevent default navigation with e.preventDefault()
                  onClick={openVideoModal}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Our Demo
                </a>
              </div>
            </div>
            {/* */}
          </div>

          {/* */}
          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <img
              className="h-120 w-120 object-cover sm:h-96 md:h-120 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
            />
          </div>

          {/* */}
        </div>
      </section>

      {/* Video Modal - Frameless version, styled with Tailwind CSS */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          {/* Removed bg-white, rounded-lg, shadow-xl, and padding from this div */}
          <div className="relative w-full max-w-2xl mx-4">
            {/* Close button - repositioned for a frameless look */}
            <button
              onClick={closeVideoModal}
              // Tailwind classes for close button position and style
              className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none md:-top-12 md:right-4"
              aria-label="Close video"
            >
              <svg
                className="h-8 w-8" // Slightly larger for easier click
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Responsive video container for 16:9 aspect ratio */}
            <div
              className="relative"
              style={{ paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={youtubeEmbedUrl + "?autoplay=1"} // Auto-play when modal opens
                title="Our Demo Video"
                frameBorder="0" // Already set to 0, ensures no default iframe border
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full" // Removed rounded-lg here too for truly no border
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageHeroSectionBeta1;
