// src/pages/landing/PlayerPerformance.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PlayerPerformance = ({ playerPerformance }) => (
  <section className="py-6">
    <Container>
      <Row>
        <Col>
          <Card className="text-center shadow mb-5">
            <Card.Body>
              <Card.Title as="h2">Player Performance</Card.Title>
              <Row>
                {playerPerformance.map((player, index) => (
                  <Col md={4} className="mb-4" key={index}>
                    <Card className="h-100 shadow-sm">
                      <Card.Img
                        variant="top"
                        src={player.image}
                        className="rounded"
                      />
                      <Card.Body>
                        <h5>{player.name}</h5>
                        <p>{player.performanceDetails}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default PlayerPerformance;
