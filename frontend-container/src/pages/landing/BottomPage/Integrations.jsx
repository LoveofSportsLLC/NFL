// src/pages/landing/Integrations.jsx
import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import nflDataLogo from "../../../assets/img/photos/nfl-data-logo.png";

const Integrations = () => (
  <section className="pt-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
              Integrations
            </span>
            <h2 className="h1">
              Launch faster with ready-to-deploy integrations
            </h2>
            <p className="text-muted fs-lg">
              Our NFL Statistics Analytics platform includes multiple
              ready-to-deploy integrations, making it easy for you to access
              real-time data, player statistics, and game insights.
            </p>
            <div className="my-4">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>NFL Data API</Tooltip>}
              >
                <div className="landing-integration">
                  <img src={nflDataLogo} alt="NFL Data API" />
                </div>
              </OverlayTrigger>
            </div>
            <Button
              variant="primary"
              size="lg"
              as="a"
              href="/docs/integration"
              target="_blank"
              rel="noreferrer"
            >
              Explore Integrations
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Integrations;
