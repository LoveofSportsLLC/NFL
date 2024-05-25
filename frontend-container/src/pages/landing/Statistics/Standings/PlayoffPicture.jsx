// src/pages/landing/Statistics/Standings/PlayoffPicture.jsx
import React from "react";
import { Card } from "react-bootstrap";

const PlayoffPicture = () => {
  // Dummy playoff data
  const playoffPicture = "Current playoff standings and projections.";

  return (
    <Card>
      <Card.Body>
        <Card.Title>Playoff Picture</Card.Title>
        <Card.Text>{playoffPicture}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlayoffPicture;
