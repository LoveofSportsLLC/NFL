// src/pages/landing/Statistics/Games/GameAnalysis.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const GameAnalysis = () => {
  // Dummy analysis data
  const analysis = 'In-depth analysis of key games.';

  return (
    <Card>
      <Card.Body>
        <Card.Title>Game Analysis</Card.Title>
        <Card.Text>{analysis}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameAnalysis;
