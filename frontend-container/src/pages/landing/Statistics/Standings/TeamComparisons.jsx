// src/pages/landing/Statistics/Standings/TeamComparisons.jsx
import React from "react";
import { Card } from "react-bootstrap";

const TeamComparisons = () => {
  // Dummy comparisons data
  const comparisons = "Compare standings and stats between teams.";

  return (
    <Card>
      <Card.Body>
        <Card.Title>Team Comparisons</Card.Title>
        <Card.Text>{comparisons}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TeamComparisons;
