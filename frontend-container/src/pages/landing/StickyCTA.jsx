// src/pages/landing/StickyCTA.jsx
import React from "react";
import { Button } from "react-bootstrap";

const StickyCTA = () => (
  <div className="sticky-cta">
    <Button variant="primary" className="m-2" href="/signup">
      Sign Up
    </Button>
    <Button variant="success" className="m-2" href="/join">
      Join Now
    </Button>
  </div>
);

export default StickyCTA;

// CSS in global styles or specific component CSS
.sticky-cta {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}