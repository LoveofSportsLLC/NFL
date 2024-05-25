// src/pages/landing/Statistics/Coaches/CoachesPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import placeholderImage from "../../../../assets/img/photos/loveoffootball-logo.png"; // Placeholder image

const CoachesPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Coach 1 Overview"
        />
        <Carousel.Caption>
          <h5>Coach 1</h5>
          <p>Overview of coach performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Coach 2 Overview"
        />
        <Carousel.Caption>
          <h5>Coach 2</h5>
          <p>Overview of coach performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={placeholderImage}
          alt="Coach 3 Overview"
        />
        <Carousel.Caption>
          <h5>Coach 3</h5>
          <p>Overview of coach performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CoachesPreview;
