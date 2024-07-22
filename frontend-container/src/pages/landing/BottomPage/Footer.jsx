// src/pages/landing/Footer.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FBIcon from '/brands/faFacebook.svg';
import INSTAIcon from '/brands/faInstagram.svg';
import TWIcon from '/brands/faTwitter.svg';
import LINKIcon from '/brands/faLinkedin.svg';

const Footer = () => (
  <section className="landing-footer py-6">
    <Container className="text-center landing-footer-container">
      <Row>
        <Col md="9" lg="8" xl="6" className="mx-auto">
          <h2 className="h1 mb-3">Stay Connected with Us</h2>
          <p className="text-muted text-lg">
            Join the NFL analytics community and stay up-to-date with the latest
            insights, statistics, and news.
          </p>
          <Button
            variant="success"
            size="lg"
            href="/auth/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-n1 btn-pill"
          >
            Get LoveofFootball.io
          </Button>
          <div>
            <img src={FBIcon} alt="Facebook" width="30" height="30" />
            <img src={INSTAIcon} alt="Instagram" width="30" height="30" />
            <img src={TWIcon} alt="Twitter" width="30" height="30" />
            <img src={LINKIcon} alt="Linkedin" width="30" height="30" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="text-center mt-4">
          <a
            href="https://loveoffootball.io/auth/privacypolicy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          {" | "}
          <a
            href="https://loveoffootball.io/auth/termsofservice"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Footer;
