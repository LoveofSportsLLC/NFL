// src/pages/landing/Statistics/Standings/Standings.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CurrentStandings from './CurrentStandings';
import PlayoffPicture from './PlayoffPicture';
import Trends from './Trends';
import TeamComparisons from './TeamComparisons';

const Standings = () => {
  return (
    <Container>
      <Row>
        <Col md="6">
          <CurrentStandings />
        </Col>
        <Col md="6">
          <PlayoffPicture />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Trends />
        </Col>
        <Col md="6">
          <TeamComparisons />
        </Col>
      </Row>
    </Container>
  );
};

export default Standings;
