import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faCss3Alt,
  faUnity,
  faGoogle,
  faJsSquare,
} from "@fortawesome/free-brands-svg-icons";
import {
  faRocket,
  faMobileAlt,
  faCubes,
  faCodeBranch,
  faServer,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const HomePageSecondSection = () => {
  return (
    <div>
      <section
        id="features"
        className="container mx-auto px-4 space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-20"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Technologies Used
          </h2>

          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Building modern web experiences with cutting-edge technologies.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {/* React + Vite.js */}
          <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FontAwesomeIcon
                icon={faReact}
                className="h-12 w-12 text-blue-500"
              />
              <div className="space-y-2">
                <h3 className="font-bold">React + Vite.js</h3>
                <p className="text-sm text-muted-foreground">
                  Modern, fast web application development with React and Vite.
                </p>
              </div>
            </div>
          </div>

          {/* Tailwind CSS */}
          <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FontAwesomeIcon
                icon={faCss3Alt}
                className="h-12 w-12 text-teal-500"
              />
              <div className="space-y-2">
                <h3 className="font-bold">Tailwind CSS</h3>
                <p className="text-sm">
                  Rapid UI development with a utility-first CSS framework.
                </p>
              </div>
            </div>
          </div>

          {/* Unity */}
          <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FontAwesomeIcon
                icon={faUnity}
                className="h-12 w-12 text-gray-700"
              />
              <div className="space-y-2">
                <h3 className="font-bold">Unity</h3>
                <p className="text-sm text-muted-foreground">
                  Powerful platform for creating interactive 3D experiences and
                  games.
                </p>
              </div>
            </div>
          </div>

          {/* ARCore */}
          <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FontAwesomeIcon
                icon={faGoogle}
                className="h-12 w-12 text-purple-600"
              />
              <div className="space-y-2">
                <h3 className="font-bold">ARCore</h3>
                <p className="text-sm text-muted-foreground">
                  Enabling augmented reality experiences on mobile devices.
                </p>
              </div>
            </div>
          </div>

          {/* Firebase */}
          <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FontAwesomeIcon
                icon={faFire}
                className="h-12 w-12 text-yellow-500"
              />
              <div className="space-y-2">
                <h3 className="font-bold">Firebase</h3>
                <p className="text-sm text-muted-foreground">
                  Backend services for secure authentication, real-time
                  databases, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder for future tech */}
          <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FontAwesomeIcon icon={faJsSquare} className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">JS Libraries</h3>
                <p className="text-sm text-muted-foreground">
                  Always exploring new technologies to enhance user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageSecondSection;
