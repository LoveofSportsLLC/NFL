// src/pages/landing/Intro.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import screenshotFootballAnalytics from "../../assets/img/photos/screenshot-football-analytics.png";

const Intro = ({ handleDonateClick }) => (
  <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
    <Container className="landing-intro-content">
      <Row className="align-items-center">
        <Col lg="5" className="mx-auto text-center text-lg-start">
          <h1 className="display-4 font-weight-bold my-4">
            Elevate Your Game with{" "}
            <span className="text-primary">LoveofFootball.io</span>
          </h1>
          <p className="text-lg lead">
            Dive into the world of football analytics and unlock powerful
            insights for fantasy football success and strategic betting.
          </p>
          <p className="mb-4">
            Our platform brings you real-time data, in-depth player analysis,
            and predictive modeling to give you an unmatched advantage.
          </p>
          <div>
            <Link
              to="/features"
              className="btn btn-primary btn-pill btn-lg me-2"
            >
              Explore Features
            </Link>
            <Button
              onClick={handleDonateClick}
              variant="success"
              className="btn-pill btn-lg"
            >
              Donate
            </Button>
          </div>
        </Col>
        <Col lg="7" className="d-none d-lg-flex mx-auto text-center">
          {/* Replace with a relevant fantasy football analytics dashboard image */}
          <img
            src={screenshotFootballAnalytics}
            alt="Football Analytics Dashboard"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default Intro;
