// src/pages/landing/Statistics/Games/GameHighlights.jsx
import React from "react";
import { Card } from "react-bootstrap";

const GameHighlights = () => {
  // Dummy highlights data
  const highlights = "Video highlights and play-by-play analysis.";

  return (
    <Card>
      <Card.Body>
        <Card.Title>Game Highlights</Card.Title>
        <Card.Text>{highlights}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameHighlights;
