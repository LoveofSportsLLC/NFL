// src/pages/landing/Statistics/Games/GamesPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import gamerecap1 from "/analysis/gamerecap1.webp";
import gamerecap2 from "/analysis/gamerecap2.webp";
import gamerecap3 from "/analysis/gamerecap3.webp";
import gamerecap4 from "/analysis/gamerecap4.jpg";

const GamesPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={gamerecap4}
          alt="Game Review for Player"
        />
        <Carousel.Caption>
          <h5>Game Statistucs</h5>
          <p>Game Statistics for Player</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={gamerecap1}
          alt="Game 2 Overview"
        />
        <Carousel.Caption>
          <h5>Game 2</h5>
          <p>Overview of game statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={gamerecap2}
          alt="Game 3 Overview"
        />
        <Carousel.Caption>
          <h5>Game 3</h5>
          <p>Overview of game statistics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          src={gamerecap3}
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
