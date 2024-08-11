import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import screenshotFootballAnalytics from '/photos/screenshot-football-analytics.png';

const Intro = ({ handleDonateClick }) => (
  <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
    <Container className="landing-intro-content bg-light border p-4 rounded shadow-sm">
      <Row className="align-items-center">
        <Col lg="5" className="mx-auto text-center text-lg-start mb-4 mb-lg-0">
          <h1 className="display-4 font-weight-bold my-4">
            Elevate Your Game with{' '}
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
            <a
              href="#ai-overview"
              className="btn btn-primary btn-pill btn-lg me-2 mb-2 mb-lg-0"
            >
              Explore Features
            </a>
            <Button
              onClick={handleDonateClick}
              variant="success"
              className="btn-pill btn-lg mb-2 mb-lg-0"
            >
              Donate
            </Button>
          </div>
        </Col>
        <Col lg="7" className="d-flex justify-content-center">
          <img
            src={screenshotFootballAnalytics}
            alt="Football Analytics Dashboard"
            className="img-fluid rounded shadow-lg"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '0.375rem',
            }}
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default Intro;
