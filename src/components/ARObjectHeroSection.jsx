import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ARObjectHeroSection = () => {
  const [displayName, setDisplayName] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName(null);
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <div>
      {/* <!-- Hero --> */}
      {/* This is I added: sm:pt-24 lg:pt-32 sm:pb-24 lg:pb-32 */}
      <div className="bg-slate-900 ">
        <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent sm:pt-20 lg:pt-24 sm:pb-20 lg:pb-24">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 ">
            {/* <!-- Announcement Banner --> */}
            <div className="flex justify-center">
              {/* <a
                className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 ps-4 rounded-full shadow-md"
                href="../figma.html"
              >
                <p className="me-2 inline-block text-white text-sm">
                  Preline UI Figma is live.
                </p>
                <span className="group-hover:bg-white/[.1] py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                  <svg
                    className="flex-shrink-0 size-4"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </a> */}
            </div>
            {/* <!-- End Announcement Banner --> */}

            {/* <!-- Title --> */}
            {/* Workin fine */}
            {/* <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome,
                <span className="block text-indigo-600 xl:inline">
                  {displayName ? `User: ${displayName}` : "Loading..."}
                </span>
              </h1>
            </div> */}

            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:inline-block">
                Welcome,
              </h1>
              <div className="block text-center xl:inline-block">
                <span className="block font-medium text-indigo-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:inline-block">
                  {displayName ? `User: ${displayName}` : "Unknown-User..."}
                </span>
              </div>
            </div>
            {/* <!-- End Title --> */}

            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-400">
                Preline is a large open-source project, crafted with Tailwind
                CSS framework by Hmlstream.
              </p>
            </div>

            {/* <!-- Buttons --> */}
            <div className="text-center">
              <a
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                href="#"
              >
                Get started
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
            {/* <!-- End Buttons --> */}
          </div>
        </div>
      </div>
      {/* <!-- End Hero --> */}
    </div>
  );
};

export default ARObjectHeroSection;
