// src/pages/landing/ColorSchemesAndLayouts.jsx
import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import nflScreenshotLight from "../../assets/img/photos/theme-light.png";
import nflScreenshotDark from "../../assets/img/photos/theme-dark.png";
import nflScreenshotTeam from "../../assets/img/photos/theme-team.png";

const ColorSchemesAndLayouts = () => (
  <section className="py-6 bg-white" id="design-options">
    <Container className="position-relative z-3">
      <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="mb-4">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  Design Options
                </span>
                <h2 className="h1 mb-3">
                  Choose Your Color Scheme &amp; Layout
                </h2>
                <p className="text-muted fs-lg">
                  Customize the look and feel of your NFL statistics platform
                  with various color schemes and layouts. You have the
                  flexibility to create a unique design that suits your
                  preferences.
                </p>
              </div>
            </div>
          </Row>

          <Row>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/design/default?theme=default"
              >
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faPalette} />
                </div>
                <img
                  src={nflScreenshotLight}
                  className="img-fluid rounded-lg landing-img"
                  alt="Default Design Option"
                />
              </Link>
              <h4>
                Light Theme
                <sup>
                  <Badge as="small" bg="primary">
                    Packers
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/design/default?sidebarBehavior=compact"
              >
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faPalette} />
                </div>
                <img
                  src={nflScreenshotDark}
                  className="img-fluid rounded-lg landing-img"
                  alt="Compact Sidebar NFL Statistics Dashboard"
                />
              </Link>
              <h4>
                Dark Theme{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    Packers
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="4" className="py-3">
              <Link
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/design/default?sidebarBehavior=compact"
              >
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faPalette} />
                </div>
                <img
                  src={nflScreenshotTeam}
                  className="img-fluid rounded-lg landing-img"
                  alt="Team Theme Colors"
                />
              </Link>
              <h4>
                Team Color Theme{" "}
                <sup>
                  <Badge as="small" bg="primary">
                    Packers
                  </Badge>
                </sup>
              </h4>
            </Col>
            {/* Add more design options with relevant links and screenshots */}
            {/* ... */}
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

export default ColorSchemesAndLayouts;
