// src/pages/landing/StickyCTA.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

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
