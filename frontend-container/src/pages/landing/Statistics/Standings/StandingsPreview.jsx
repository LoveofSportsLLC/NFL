// src/pages/landing/Statistics/Standings/StandingsPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import standings1 from "/analysis/standings1.webp";
import standings2 from "/analysis/standings2.webp";
import standings3 from "/analysis/standings3.webp";

const StandingsPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={standings1}
          alt="Standings 1 Overview"
        />
        <Carousel.Caption>
          <h5>Standings 1</h5>
          <p>Overview of current standings.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={standings2}
          alt="Standings 2 Overview"
        />
        <Carousel.Caption>
          <h5>Standings 2</h5>
          <p>Overview of current standings.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={standings3}
          alt="Standings 3 Overview"
        />
        <Carousel.Caption>
          <h5>Standings 3</h5>
          <p>Overview of current standings.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default StandingsPreview;
