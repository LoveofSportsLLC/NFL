// src/pages/landing/Statistics/Standings/StandingsPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import placeholderImage from "../../../../assets/img/photos/loveoffootball-logo.png"; // Placeholder image

const StandingsPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Standings 1 Overview"
        />
        <Carousel.Caption>
          <h5>Standings 1</h5>
          <p>Overview of current standings.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Standings 2 Overview"
        />
        <Carousel.Caption>
          <h5>Standings 2</h5>
          <p>Overview of current standings.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
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
