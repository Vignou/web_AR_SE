import React from "react";
import NoAccess from "../components/NoAccess";
import HomePageHeroSection from "../components/HomePageHeroSection";
import HomePageSecondSection from "../components/HomePageSecondSection";
import HomePageHeroSectionBeta1 from "../components/HomePageHeroSectionBeta1";
import HomePageThirdSection from "../components/HomePageThirdSection";

const HomePage = () => {
  return (
    <div>
      <div className="bg-slate-900">
        <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
          {/* <HomePageHeroSection /> */}

          <HomePageHeroSectionBeta1 />
        </div>
      </div>
      <HomePageSecondSection />
      <HomePageThirdSection />
    </div>
  );
};

export default HomePage;
