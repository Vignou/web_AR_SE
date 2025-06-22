import React from "react";

const CreateARPageHeroSection = () => {
  return (
    <div>
      {/* className=" min-h-screen flex items-center justify-center bg-no-repeat bg-center sm:bg-cover" */}
      <div
        className=" min-h-120 min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover relative"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/webvr-98666.appspot.com/o/VR.jpg?alt=media&token=6b1dda3b-7d6f-4043-b66e-2bd7b611b2f8)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content">
          <div className="max-w-md text-center">
            <h1 className="text-4xl tracking-tight font-extrabold t text-yellow-300 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Start your Journey </span>
              <span className="block text-pink-700 xl:inline">
                with Location-Based AR
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-50 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 pb-5">
              Transform your surroundings into an interactive canvas. Create
              immersive experiences tied to real-world locations, from games to
              guided tours. Explore the possibilities of augmented reality
              around you.
            </p>
            {/* <!-- Button Section --> */}
            {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"> */}
            {/* <button className="btn btn-primary mr-4 sm:mr-8 px-8 py-3 bg-blue-500 text-white rounded-md">
              Get Started
            </button>
            <button className="btn btn-secondary px-8 py-3 bg-red-500 text-white rounded-md">
              Get Started
            </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateARPageHeroSection;
