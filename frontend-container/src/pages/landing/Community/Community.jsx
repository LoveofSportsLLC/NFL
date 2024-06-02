// src/pages/landing/CommunityForum.jsx
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CommunityForum = () => (
  <section className="py-6">
    <Container>
      <div className="mb-5 text-center">
        <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
          Community Forum
        </span>
        <h2 className="h1">Join the Discussion</h2>
        <p className="text-muted fs-lg">
          Engage with other football enthusiasts, share insights, discuss hot
          topics, and get answers to your questions.
        </p>
      </div>
      <Row>
        <Col md="6" lg="4" className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Recent Discussion: New Kick-Off Rules</Card.Title>
              <Card.Text>
                Dive into the discussion about how the latest kick-off rules are
                changing game dynamics.
              </Card.Text>
              <Button
                variant="primary"
                as={Link}
                to="/community/topic/new-kick-off-rules"
              >
                Join Discussion
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg="4" className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Poll: Who Will Win Super Bowl LVII?</Card.Title>
              <Card.Text>
                Cast your vote and see what the community thinks about the
                upcoming Super Bowl champion.
              </Card.Text>
              <Button
                variant="primary"
                as={Link}
                to="/community/poll/superbowl-lvii"
              >
                Vote Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default CommunityForum;
