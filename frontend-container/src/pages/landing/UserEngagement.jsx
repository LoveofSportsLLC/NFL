// src/pages/landing/UserEngagement.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const UserEngagement = ({ userEngagement }) => (
  <section className="py-6">
    <Container>
      <Row>
        <Col>
          <Card className="text-center shadow mb-5">
            <Card.Body>
              <Card.Title as="h2">User Engagement</Card.Title>
              <Row className="align-items-center">
                <Col md={6} className="text-center">
                  <img
                    src={userEngagement.image}
                    alt="User Engagement"
                    className="img-fluid rounded shadow"
                  />
                </Col>
                <Col md={6}>
                  <h5>Active Users</h5>
                  <p className="lead">{userEngagement.activeUsers}</p>
                  <h5>Frequency of Usage</h5>
                  <p className="lead">{userEngagement.frequencyOfUsage}</p>
                  <h5>Time Spent on Platform</h5>
                  <p className="lead">{userEngagement.timeSpent}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default UserEngagement;
