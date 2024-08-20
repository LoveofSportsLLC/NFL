// src/pages/landing/Statistics/Coaches/Coaches.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CoachList from './CoachList';
import CoachProfile from './CoachProfile';
import ComparativeAnalysis from './ComparativeAnalysis';

const Coaches = () => {
  return (
    <Container>
      <Row>
        <Col md="4">
          <CoachList />
        </Col>
        <Col md="8">
          <CoachProfile />
          <ComparativeAnalysis />
        </Col>
      </Row>
    </Container>
  );
};

export default Coaches;
