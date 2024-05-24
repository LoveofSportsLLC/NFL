// src/components/Analysis.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const AnalyticsPage = () => {
  // Mock data for demonstration
  const mockOverviewData = {
    totalMatches: 5000,
    totalPlayers: 1200,
    activeUsers: 15000,
  };

  const mockMatchAnalysis = [
    {
      title: "Match 1 Analysis",
      details: "Detailed analysis of match 1.",
      image: "path/to/match1-analysis-ai-image.jpg", // Placeholder for AI-generated image
    },
    {
      title: "Match 2 Analysis",
      details: "Detailed analysis of match 2.",
      image: "path/to/match2-analysis-ai-image.jpg", // Placeholder for AI-generated image
    },
  ];

  const mockPlayerPerformance = [
    {
      name: "Player 1",
      performanceDetails: "Details about player 1 performance.",
      image: "path/to/player1-performance-ai-image.jpg", // Placeholder for AI-generated image
    },
    {
      name: "Player 2",
      performanceDetails: "Details about player 2 performance.",
      image: "path/to/player2-performance-ai-image.jpg", // Placeholder for AI-generated image
    },
  ];

  const mockPredictionAccuracy = {
    explainedVariance: 0.97929,
    meanAbsoluteError: 1.0984,
    r2Score: 0.97929,
    spearmanCorrelation: 0.98476,
  };

  const mockUserEngagement = {
    activeUsers: 15000,
    frequencyOfUsage: "Daily",
    timeSpent: "2 hours per session",
    image: "path/to/user-engagement-ai-image.jpg", // Placeholder for AI-generated image
  };

  const [overviewData, setOverviewData] = useState(mockOverviewData);
  const [matchAnalysis, setMatchAnalysis] = useState(mockMatchAnalysis);
  const [playerPerformance, setPlayerPerformance] = useState(
    mockPlayerPerformance,
  );
  const [predictionAccuracy, setPredictionAccuracy] = useState(
    mockPredictionAccuracy,
  );
  const [userEngagement, setUserEngagement] = useState(mockUserEngagement);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="mt-5">Love of Football Analytics Dashboard</h1>
          <hr />
        </Col>
      </Row>

      {/* Overview Section */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Overview</Card.Header>
            <Card.Body>
              <p>
                <strong>Total Matches Analyzed:</strong>{" "}
                {overviewData.totalMatches}
              </p>
              <p>
                <strong>Total Players Tracked:</strong>{" "}
                {overviewData.totalPlayers}
              </p>
              <p>
                <strong>Active Users:</strong> {overviewData.activeUsers}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Match Analysis Section */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Match Analysis</Card.Header>
            <Card.Body>
              {matchAnalysis.map((match, index) => (
                <div key={index}>
                  <h5>{match.title}</h5>
                  <img
                    src={match.image}
                    alt={match.title}
                    className="img-fluid mb-3"
                  />
                  <p>{match.details}</p>
                  <hr />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Player Performance Section */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Player Performance</Card.Header>
            <Card.Body>
              {playerPerformance.map((player, index) => (
                <div key={index}>
                  <h5>{player.name}</h5>
                  <img
                    src={player.image}
                    alt={player.name}
                    className="img-fluid mb-3"
                  />
                  <p>{player.performanceDetails}</p>
                  <hr />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Prediction Accuracy Section */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Prediction Accuracy</Card.Header>
            <Card.Body>
              <p>
                <strong>Explained Variance:</strong>{" "}
                {predictionAccuracy.explainedVariance}
              </p>
              <p>
                <strong>Mean Absolute Error:</strong>{" "}
                {predictionAccuracy.meanAbsoluteError}
              </p>
              <p>
                <strong>R2 Score:</strong> {predictionAccuracy.r2Score}
              </p>
              <p>
                <strong>Spearman Correlation:</strong>{" "}
                {predictionAccuracy.spearmanCorrelation}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Engagement Section */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>User Engagement</Card.Header>
            <Card.Body>
              <img
                src={userEngagement.image}
                alt="User Engagement"
                className="img-fluid mb-3"
              />
              <p>
                <strong>Active Users:</strong> {userEngagement.activeUsers}
              </p>
              <p>
                <strong>Frequency of Usage:</strong>{" "}
                {userEngagement.frequencyOfUsage}
              </p>
              <p>
                <strong>Time Spent on Platform:</strong>{" "}
                {userEngagement.timeSpent}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsPage;
