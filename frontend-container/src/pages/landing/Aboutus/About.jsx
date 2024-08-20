// src/pages/landing/News/News.jsx
import React from 'react';
import AboutUsModal from './AboutUs';
import Testimonials from './Testimonials';
import Faq from './Faq';
import SupportModal from './SupportModal';
// Import the new component

const About = () => {
  return (
    <div className="news-section">
      <AboutUsModal />
      <Testimonials />
      <Faq />
      <SupportModal />
    </div>
  );
};

export default About;
