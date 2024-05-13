//frontend-container/src/components/TeamSelection.jsx
import React, { useState } from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { TEAMS } from "../constants"; // Ensure TEAMS is correctly imported

const TeamSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h2 className="text-center">Select Your Favorite NFL Team</h2>
          <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
            {Object.keys(TEAMS).map((teamName) => (
              <Carousel.Item key={teamName}>
                <Row className="align-items-center">
                  <Col md={6}>
                    <LazyLoadImage
                      className="d-block w-100 img-lazy"
                      src={`/teamlogos/${teamName.toLowerCase()}.png`}
                      alt={`${teamName} logo`}
                      effect="blur"
                    />
                  </Col>
                  <Col md={6}>
                    <LazyLoadImage
                      className="d-block w-100 img-lazy"
                      src={`/fans/${teamName.toLowerCase()}fans.png`}
                      alt={`${teamName} fans`}
                      effect="blur"
                    />
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamSelector;
