// src/pages/landing/Statistics/Teams/TeamsPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import placeholderImage from "../../../../assets/img/photos/loveoffootball-logo.png"; // Placeholder image

const TeamsPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Team 1 Overview"
        />
        <Carousel.Caption>
          <h5>Team 1</h5>
          <p>Overview of team performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Team 2 Overview"
        />
        <Carousel.Caption>
          <h5>Team 2</h5>
          <p>Overview of team performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Team 3 Overview"
        />
        <Carousel.Caption>
          <h5>Team 3</h5>
          <p>Overview of team performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default TeamsPreview;
