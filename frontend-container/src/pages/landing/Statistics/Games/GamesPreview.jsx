// src/pages/landing/Statistics/Games/GamesPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import placeholderImage from "../../../../assets/img/photos/loveoffootball-logo.png"; // Placeholder image

const GamesPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Game 1 Overview"
        />
        <Carousel.Caption>
          <h5>Game 1</h5>
          <p>Overview of game statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Game 2 Overview"
        />
        <Carousel.Caption>
          <h5>Game 2</h5>
          <p>Overview of game statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Game 3 Overview"
        />
        <Carousel.Caption>
          <h5>Game 3</h5>
          <p>Overview of game statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default GamesPreview;
