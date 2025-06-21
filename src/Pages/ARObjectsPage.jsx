import React from "react";
import ARObjectHeroSection from "../components/ARObjectHeroSection";
import ARObjectItemSection from "../components/ARObjectItemSection";
import ARObjectItemsSectionBeta1 from "../components/ARObjectItemsSectionBeta1";
import ARObjectItemsSectionBeta2 from "../components/ARObjectItemsSectionBeta2";

const ARObjectsPage = () => {
  return (
    <div>
      <ARObjectHeroSection />
      {/* <ARObjectItemSection /> */}
      {/* <ARObjectItemsSectionBeta1 /> */}
      <ARObjectItemsSectionBeta2 />
    </div>
  );
};

export default ARObjectsPage;
