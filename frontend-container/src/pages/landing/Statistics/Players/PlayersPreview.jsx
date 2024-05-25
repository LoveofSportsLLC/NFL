// src/pages/landing/Statistics/Players/PlayersPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import placeholderImage from "../../../../assets/img/photos/loveoffootball-logo.png"; // Placeholder image

const PlayersPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Player 1 Overview"
        />
        <Carousel.Caption>
          <h5>Player 1</h5>
          <p>Overview of player statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Player 2 Overview"
        />
        <Carousel.Caption>
          <h5>Player 2</h5>
          <p>Overview of player statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Player 3 Overview"
        />
        <Carousel.Caption>
          <h5>Player 3</h5>
          <p>Overview of player statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default PlayersPreview;
