// src/pages/landing/Testimonials.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => (
  <section className="py-6">
    <Container>
      <div className="mb-5 text-center">
        <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
          Reviews
        </span>
        <h2 className="h1">Users love our NFL Statistics Analytics</h2>
        <p className="text-muted fs-lg">
          See what some of our satisfied users have to say about the valuable
          insights they've gained from our platform.
        </p>
      </div>
      <Row>
        <Col md="6" lg="4">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src="/avatars/avatar-1.jpg"
                    width="48"
                    height="48"
                    alt="User 1"
                  />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">John Doe</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    NFL Analyst
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                "The NFL Statistics Analytics platform has revolutionized the
                way I analyze games. The in-depth player statistics and
                historical data are incredibly valuable for making informed
                predictions."
              </p>
              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Testimonials;
