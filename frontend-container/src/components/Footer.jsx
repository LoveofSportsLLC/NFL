import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SupportModal from "../pages/landing/Aboutus/SupportModal";

const Footer = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleSupportClick = () => {
    setShowSupportModal(true);
  };

  const handleSupportModalClose = () => {
    setShowSupportModal(false);
  };

  return (
    <footer className="footer">
      <Container fluid>
        <Row className="text-muted">
          <Col xs="6" className="text-start">
            <ul className="list-inline">
              <li className="list-inline-item">
                <button
                  className="btn btn-link p-0 text-decoration-none text-muted"
                  onClick={handleSupportClick}
                >
                  Support
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  className="btn btn-link p-0 text-decoration-none text-muted"
                  onClick={() => (window.location.href = "/help-center")}
                >
                  Help Center
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  className="btn btn-link p-0 text-decoration-none text-muted"
                  onClick={() => (window.location.href = "/auth/privacypolicy")}
                >
                  Privacy
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  className="btn btn-link p-0 text-decoration-none text-muted"
                  onClick={() =>
                    (window.location.href = "/auth/termsofservice")
                  }
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </Col>
          <Col xs="6" className="text-end">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} -{" "}
              <Link to="/" className="text-muted">
                AppStack
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
      <SupportModal show={showSupportModal} onHide={handleSupportModalClose} />
    </footer>
  );
};

export default Footer;
