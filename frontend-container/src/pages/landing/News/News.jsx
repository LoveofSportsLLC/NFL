// src/pages/landing/News/News.jsx
import React from "react";
import LatestHeadlines from "./LatestHeadlines";
import InjuriesFeed from "./InjuriesFeed";
import FeaturedHighlights from "./FeaturedHighlights"; // Import the new component

const News = () => {
  return (
    <div className="news-section">
      <LatestHeadlines />
      <InjuriesFeed />
      <FeaturedHighlights /> {/* Include Featured Highlights */}
    </div>
  );
};

export default News;
