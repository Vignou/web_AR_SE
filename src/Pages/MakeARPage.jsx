import React from "react";
import MakeARPageHeroSection from "../components/MakeARPageHeroSection";
import CreateARSectionBeta4 from "../components/CreateARSectionBeta4";
import MakeARSection from "../components/MakeARSection";

const MakeARPage = () => {
  return (
    <div>
      <MakeARPageHeroSection />
      {/* <CreateARSection /> */}
      {/* <CreateARSectionBeta2 /> */}
      {/* This one: number 3 is working fine */}
      {/* <CreateARSectionBeta3 /> */}
      <MakeARSection />
      {/* <CreateARSectionBeta1 /> */}
      {/* <MapComponent /> */}
      {/* <CreateARDataUploadSection /> */}
      {/* <Location /> */}
    </div>
  );
};

export default MakeARPage;
