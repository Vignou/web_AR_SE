import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUnity } from "@fortawesome/free-brands-svg-icons";

function HomePageThirdSection() {
  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-b from-violet-600/[.15] via-transparent font-inter text-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 lg:p-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-blue-800 mb-12 leading-tight">
          How Our Location-Based AR Works
        </h1>

        <p className="text-lg sm:text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          We bring your virtual content to life in the real world through a
          robust and seamless data pipeline. Here's a look at the core process:
        </p>

        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-8">
          {/* Step 1 */}
          <div className="flex flex-col justify-between text-center p-6 bg-blue-50 rounded-2xl shadow-md w-full max-w-sm h-[440px] lg:flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-200 rounded-full mb-4 shadow-inner">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  className="h-10 w-10 text-blue-700"
                />
              </div>
              <h2 className="text-2xl font-bold text-blue-700 mb-3">
                1. Input Data
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Begin by uploading GPS locations, 3D models, or interactive
                elements. This forms the base of your AR scene.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                (Geospatial CMS, APIs, Upload Tools)
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:block">
            <svg
              className="w-20 h-20 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
          <div className="lg:hidden block">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 7l4 4m0 0l-4 4m4-4H0"
              />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col justify-between text-center p-6 bg-yellow-50 rounded-2xl shadow-md w-full max-w-sm h-[440px] lg:flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-yellow-200 rounded-full mb-4 shadow-inner">
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="h-10 w-10 text-yellow-700"
                />
              </div>
              <h2 className="text-2xl font-bold text-yellow-700 mb-3">
                2. Firebase Backend
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Data is stored and managed securely in Firebase. Sync in real
                time with Firestore, Storage, and Authentication.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                (Realtime DB, Cloud Functions, Auth)
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:block">
            <svg
              className="w-20 h-20 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
          <div className="lg:hidden block">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 7l4 4m0 0l-4 4m4-4H0"
              />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-between text-center p-6 bg-green-50 rounded-2xl shadow-md w-full max-w-sm h-[440px] lg:flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-green-200 rounded-full mb-4 shadow-inner">
                <FontAwesomeIcon
                  icon={faUnity}
                  className="h-10 w-10 text-green-700"
                />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-3">
                3. Unity + ARCore
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The Unity app powered by ARCore displays your AR content at the
                precise GPS location with full interactivity.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                (Anchoring, Rendering, Interaction)
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg sm:text-xl text-center text-gray-600 mt-16 max-w-3xl mx-auto">
          This streamlined pipeline ensures a dynamic, immersive AR experience
          from creation to real-world delivery.
        </p>
      </div>
    </div>
  );
}

export default HomePageThirdSection;
