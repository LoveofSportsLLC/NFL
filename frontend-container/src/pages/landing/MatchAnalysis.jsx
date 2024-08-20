// src/pages/landing/MatchAnalysis.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MatchAnalysis = ({ matchAnalysis }) => (
  <section className="py-6 bg-light">
    <Container>
      <Row>
        <Col>
          <Card className="text-center shadow mb-5">
            <Card.Body>
              <Card.Title as="h2">Match Analysis</Card.Title>
              <Row>
                {matchAnalysis.map((match, index) => (
                  <Col md={4} className="mb-4" key={index}>
                    <Card className="h-100 shadow-sm">
                      <Card.Img
                        variant="top"
                        src={match.image}
                        className="rounded"
                      />
                      <Card.Body>
                        <h5>{match.title}</h5>
                        <p>{match.details}</p>
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

export default MatchAnalysis;
