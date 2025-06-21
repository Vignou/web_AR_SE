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
            <h1 className="mb-5 text-6xl font-bold text-white">Hello there</h1>
            <p className="mb-5 text-xl text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary px-8 py-3 bg-blue-500 text-white rounded-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateARPageHeroSection;
