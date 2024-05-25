// src/pages/landing/Statistics/Games/Games.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GameSchedule from "./GameSchedule";
import GameResults from "./GameResults";
import GameAnalysis from "./GameAnalysis";
import GameHighlights from "./GameHighlights";

const Games = () => {
  return (
    <Container>
      <Row>
        <Col md="12">
          <GameSchedule />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <GameResults />
        </Col>
        <Col md="6">
          <GameHighlights />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <GameAnalysis />
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
