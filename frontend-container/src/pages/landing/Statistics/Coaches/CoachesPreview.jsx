// src/pages/landing/Statistics/Coaches/CoachesPreview.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import coach1 from '/analysis/coach1.webp';
import coach2 from '/analysis/coach2.webp';
import coach3 from '/analysis/coach3.webp';
import coach4 from '/analysis/coach4.webp';
import coach5 from '/analysis/coach5.webp';

const CoachesPreview = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-lazy"
          loading="lazy"
          src={coach1}
          alt="Coach"
        />
        <Carousel.Caption>
          <h5>Coach</h5>
          <p>Coaches</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          loading="lazy"
          src={coach2}
          alt="Last 3 Coaches"
        />
        <Carousel.Caption>
          <h5>Coach for Team</h5>
          <p>Teams Last 3 Coaches</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          loading="lazy"
          src={coach3}
          alt="Coach 3"
        />
        <Carousel.Caption>
          <h5>Coach Tendancies</h5>
          <p>Coaching Tendancies</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          loading="lazy"
          src={coach4}
          alt="Coach "
        />
        <Carousel.Caption>
          <h5>Sean Mcvay</h5>
          <p>Coach Overview</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          loading="lazy"
          src={coach5}
          alt="Coach Consistancy"
        />
        <Carousel.Caption>
          <h5>Coach Consistancy</h5>
          <p>Coach Consistancy</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CoachesPreview;
