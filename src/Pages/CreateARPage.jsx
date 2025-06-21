import React from "react";

import CreateARPageHeroSection from "../components/CreateARPageHeroSection";
// import CreateARDataUploadSection from "../components/CreateARDataUploadSection";
import CreateARSection from "../components/CreateARSection";
import MapComponent from "../components/MapComponent";
import CreateARSectionBeta1 from "../components/CreateARSectionBeta1";
import CreateARSectionBeta2 from "../components/CreateARSectionBeta2";
import CreateARSectionBeta3 from "../components/CreateARSectionBeta3";
import CreateARSectionBeta4 from "../components/CreateARSectionBeta4";
import Location from "../components/Location";

const CreateARPage = () => {
  return (
    <div>
      <CreateARPageHeroSection />
      {/* <CreateARSection /> */}
      {/* <CreateARSectionBeta2 /> */}
      {/* This one: number 3 is working fine */}
      {/* <CreateARSectionBeta3 /> */}
      <CreateARSectionBeta4 />
      {/* <CreateARSectionBeta1 /> */}
      {/* <MapComponent /> */}
      {/* <CreateARDataUploadSection /> */}
      {/* <Location /> */}
    </div>
  );
};

export default CreateARPage;
