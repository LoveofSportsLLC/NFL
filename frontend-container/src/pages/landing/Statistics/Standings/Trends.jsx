// src/pages/landing/Statistics/Standings/Trends.jsx
import React from "react";
import { Card } from "react-bootstrap";

const Trends = () => {
  // Dummy trends data
  const trends = "Historical trends and performance over the season.";

  return (
    <Card>
      <Card.Body>
        <Card.Title>Trends</Card.Title>
        <Card.Text>{trends}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Trends;
