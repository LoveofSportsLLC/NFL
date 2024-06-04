// src/pages/landing/Statistics/Coaches/ComparativeAnalysis.jsx
import React from "react";
import { Card } from "react-bootstrap";

const ComparativeAnalysis = () => {
  // Dummy comparative analysis data
  const analysis = "Compare statistics and performance between coaches.";

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Comparative Analysis</Card.Title>
        <Card.Text>{analysis}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ComparativeAnalysis;
