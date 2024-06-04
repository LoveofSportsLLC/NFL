// src/pages/landing/Faq.jsx
import React, { useState } from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";

const Faq = () => {
  const [activeKey, setActiveKey] = useState("0");

  return (
    <section className="bg-white py-6">
      <Container>
        <div className="mb-5 text-center">
          <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
            LoveofFootball.io
          </span>
          <h2 className="h1">Frequently Asked Questions</h2>
          <p className="text-muted fs-lg">
            Here are some of the answers you might be looking for regarding our
            NFL statistics platform.
          </p>
        </div>
        <Row>
          <Col md={9} lg={8} className="mx-auto">
            <Accordion activeKey={activeKey}>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("0")}
                >
                  <h6 className="mb-0">How do I access player statistics?</h6>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="py-3">
                    You can access player statistics by navigating to the
                    "Player Stats" dashboard on our platform. There, you'll find
                    detailed information about individual players' performance.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("1")}
                >
                  <h6 className="mb-0">What team statistics are available?</h6>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="py-3">
                    Our platform provides comprehensive team statistics,
                    including offensive and defensive performance, win-loss
                    records, player rosters, and more. You can explore these
                    statistics in the "Team Stats" dashboard.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("2")}
                >
                  <h6 className="mb-0">How can I analyze past games?</h6>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body className="py-3">
                    To analyze past games, you can use our "Game Analysis"
                    dashboard. It provides in-depth insights into historical
                    games, key plays, and game-changing moments. You can review
                    game statistics, player performances, and more.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("3")}
                >
                  <h6 className="mb-0">Can I compare player statistics?</h6>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body className="py-3">
                    Yes, our platform allows you to compare player statistics.
                    You can select multiple players and view their performance
                    metrics side by side in the "Player Stats" dashboard. This
                    feature helps you make informed decisions and comparisons.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border mb-3">
                <Card.Header
                  className="cursor-pointer"
                  onClick={() => setActiveKey("4")}
                >
                  <h6 className="mb-0">How often are statistics updated?</h6>
                </Card.Header>
                <Accordion.Collapse eventKey="4">
                  <Card.Body className="py-3">
                    Our statistics are updated regularly to provide you with the
                    most current data. Player statistics are typically updated
                    after each game, and team statistics are updated after each
                    match. We strive to ensure that you have access to the
                    latest insights.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Faq;
