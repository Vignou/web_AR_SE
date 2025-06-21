import React from "react";

const AboutPageHeroSection = () => {
  return (
    <div>
      {/* <!-- component --> */}
      <section>
        <div class="bg-black text-white py-20">
          <div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
            <div class="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
              {/* <h1 class="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
                TechFest
              </h1>
              <h2 class="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
                Space : The Timeless Infinity
              </h2>
              <p class="text-sm md:text-base text-gray-50 mb-4">
                Explore your favourite events and register now to showcase your
                talent and win exciting prizes.
              </p> */}
              <h1 className="text-4xl tracking-tight font-extrabold text-yellow-300 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">AR </span>
                <span className="block text-indigo-600 xl:inline">
                  Space : The New Realities
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <a
                href="#"
                class="mt-4 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
              >
                Explore Now
              </a>
            </div>
            <div class="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
              <div class="h-48 flex flex-wrap content-center">
                <div>
                  <img
                    className="mt-28 xl:inline-block hidden"
                    src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"
                  />
                </div>
                <div>
                  <img
                    class="inline-block mt-24 md:mt-0 p-8 md:p-0"
                    src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png"
                  />
                </div>
                <div>
                  <img
                    class="mt-28 hidden lg:block"
                    src="https://user-images.githubusercontent.com/54521023/116969939-c1d5f180-acd4-11eb-8ad4-9ab9143bdb50.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageHeroSection;
