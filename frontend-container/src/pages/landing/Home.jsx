import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import FeaturedHighlights from "./FeaturedHighlights";
import QuickLinks from "./QuickLinks";

const Home = () => {
  return (
    <div>
      <WelcomeBanner />
      <FeaturedHighlights />
      <QuickLinks />
    </div>
  );
};

export default Home;
