//src/components/TeamSelection.jsx
import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { TEAMS } from "../../constants";

const TeamSelection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // useEffect(() => {
  //   console.log("TEAMS:", TEAMS);
  //   Object.keys(TEAMS).forEach((teamName) => {
  //     console.log(`/teamlogos/${teamName.toLowerCase()}.png`);
  //     console.log(`/fans/${teamName.toLowerCase()}fans.png`);
  //   });
  // }, []);

  const handleImageError = (e, teamName, type) => {
    e.target.onerror = null; // Prevent infinite fallback loop
    console.error(`Failed to load image for ${teamName} (${type})`);
    e.target.src = "/src/assets/img/Logo.png"; // Fallback image path
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={12}>
          <h2 className="text-center">Select Your Favorite NFL Team</h2>
          <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
            {Object.keys(TEAMS).map((teamName) => (
              <Carousel.Item key={teamName}>
                <Row className="align-items-center">
                  <Col md={6}>
                    <img
                      className="d-block w-100 img-lazy"
                      src={`/teamlogos/${teamName.toLowerCase()}.png`}
                      alt={`${teamName} logo`}
                      onError={(e) => handleImageError(e, teamName, "logo")}
                    />
                  </Col>
                  <Col md={6}>
                    <img
                      className="d-block w-100 img-lazy"
                      src={`/fans/${teamName.toLowerCase()}fans.png`}
                      alt={`${teamName} fans`}
                      onError={(e) => handleImageError(e, teamName, "fans")}
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

export default TeamSelection;
