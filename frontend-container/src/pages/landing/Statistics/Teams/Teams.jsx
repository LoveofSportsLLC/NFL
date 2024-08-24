// src/pages/landing/Statistics/Teams/Teams.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamList from './TeamList';
import TeamProfile from './TeamProfile';

const Teams = () => {
  return (
    <Container>
      <Row>
        <Col md="4">
          <TeamList />
        </Col>
        <Col md="8">
          <TeamProfile />
        </Col>
      </Row>
    </Container>
  );
};

export default Teams;
