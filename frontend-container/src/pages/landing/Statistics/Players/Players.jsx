// src/pages/landing/Statistics/Players/Players.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlayerSearch from "./PlayerSearch";
import PlayerProfile from "./PlayerProfile";
import ComparisonTool from "./ComparisonTool";

const Players = () => {
  return (
    <Container>
      <Row>
        <Col md="4">
          <PlayerSearch />
        </Col>
        <Col md="8">
          <PlayerProfile />
          <ComparisonTool />
        </Col>
      </Row>
    </Container>
  );
};

export default Players;
