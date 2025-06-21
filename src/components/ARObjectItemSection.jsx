import React from "react";

const ARObjectItemSection = () => {
  return (
    <div>
      {/* <!-- source: https://github.com/mfg888/Responsive-Tailwind-CSS-Grid/blob/main/index.html --> */}

      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">
          Responsive Product card grid
        </h1>
        <h1 className="text-3xl">Tailwind CSS</h1>
      </div>

      {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
        {/* w-72 */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Product"
            //h-72, w-72
            className="h-40 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Product Name
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
              <div className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* <!--   🛑 Product card 1 - Ends Here  --> */}
      </section>

      {/* <!-- 🛑 Grid Section - Ends Here --> */}

      {/* <!-- credit --> */}
      <div className="text-center py-10 px-10">
        <h2 className="font-bold text-2xl md:text-4xl mb-4">
          Thanks to{" "}
          <a
            href="https://unsplash.com/@nixcreative"
            className="underline font-black"
          >
            Fellow Comrades
          </a>{" "}
          for those AMAZING collective product images!
        </h2>
      </div>
    </div>
  );
};

export default ARObjectItemSection;
