// src/pages/landing/Dashboards/Dashboards.jsx
import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faChartBar } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../../../components/LazyImage"; // Import LazyImage component
import darkDashboardOverview from "/analysis/darkdashboardoverview.webp";
import lightDashboardOverview from "/analysis/lightdashboardoverview.webp";
import nflDashboardOverview from "/analysis/nfldashboardoverview.webp";
import teamDashboardOverview1 from "/analysis/teamdashboardoverview1.webp";
import teamDashboardOverview2 from "/analysis/teamdashboardoverview2.webp";
import teamDashboardOverview3 from "/analysis/teamdashboardoverview3.webp";
import teamDashboardOverview4 from "/analysis/teamdashboardoverview4.webp";
import teamDashboardOverview5 from "/analysis/teamdashboardoverview5.webp";
import mobileDashboardOverview1 from "/analysis/mobiledashboardoverview1.webp";
import mobileDashboardOverview2 from "/analysis/mobiledashboardoverview2.webp";
import mobileDashboardOverview3 from "/analysis/mobiledashboardoverview3.webp";

const Dashboards = () => {
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite fallback loop
    e.target.src = "Logo.png"; // Fallback image path
  };

  return (
    <Card className="py-6" id="dashboards">
      <Container className="position-relative z-3">
        <Row>
          <Col md="12" className="mx-auto text-center">
            <div className="mb-4">
              <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                Dashboards
              </span>
              <h2 className="h1 mb-3">
                Explore Our NFL Customizable Dashboards
              </h2>
              <p className="text-muted fs-lg">
                Discover the power of our analytics with various NFL statistics
                dashboards. Dive deep into player performance, team stats, and
                game analysis. Get real-time insights to stay ahead in the game.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="text-start mb-4">
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">Data Visualization</h4>
                <p className="fs-lg">
                  Visualize complex statistics with interactive charts and
                  graphs. Understand data at a glance and share insights with
                  your team and fans.
                </p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <FontAwesomeIcon icon={faDesktop} />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">User-Friendly Interface</h4>
                <p className="fs-lg">
                  Our intuitive and easy-to-use interface ensures that both
                  beginners and experts can navigate and utilize our analytics
                  tools effectively.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="4" className="mb-3 text-center">
            <h3>Default Dashboards</h3>
            <Carousel>
              <Carousel.Item>
                <LazyImage
                  src={darkDashboardOverview}
                  alt="Dark Dashboard Overview"
                  onError={handleImageError}
                  className="d-block w-100 img-lazy"
                />
                <Carousel.Caption>
                  <p>Dark Dashboard Overview</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <LazyImage
                  src={lightDashboardOverview}
                  alt="Light Dashboard Overview"
                  onError={handleImageError}
                  className="d-block w-100 img-lazy"
                />
                <Carousel.Caption>
                  <p>Light Dashboard Overview</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <LazyImage
                  src={nflDashboardOverview}
                  alt="NFL Dashboard Overview"
                  onError={handleImageError}
                  className="d-block w-100 img-lazy"
                />
                <Carousel.Caption>
                  <p>NFL Dashboard Overview</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col md="4" className="mb-3 text-center">
            <h3>Team Dashboards</h3>
            <Carousel>
              {[
                teamDashboardOverview1,
                teamDashboardOverview2,
                teamDashboardOverview3,
                teamDashboardOverview4,
                teamDashboardOverview5,
              ].map((src, idx) => (
                <Carousel.Item key={idx}>
                  <LazyImage
                    src={src}
                    alt={`Team Dashboard Overview ${idx + 1}`}
                    onError={handleImageError}
                    className="d-block w-100 img-lazy"
                  />
                  <Carousel.Caption>
                    <p>{`Team Dashboard Overview ${idx + 1}`}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col md="4" className="mb-3 text-center">
            <h3>Mobile Dashboards</h3>
            <Carousel>
              {[
                mobileDashboardOverview1,
                mobileDashboardOverview2,
                mobileDashboardOverview3,
              ].map((src, idx) => (
                <Carousel.Item key={idx}>
                  <LazyImage
                    src={src}
                    alt={`Mobile Dashboard Overview ${idx + 1}`}
                    onError={handleImageError}
                    className="d-block w-100"
                  />
                  <Carousel.Caption>
                    <p>{`Mobile Dashboard Overview ${idx + 1}`}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default Dashboards;
