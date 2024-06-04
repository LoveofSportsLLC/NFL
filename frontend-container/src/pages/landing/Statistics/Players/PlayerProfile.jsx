// src/pages/landing/Statistics/Players/PlayerProfile.jsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const PlayerProfile = () => {
  const playerName = "Patrick Mahomes";
  const statistics = [
    "Passing: 34 completions on 46 attempts, 333 yards, 2 touchdowns, 1 interception",
    "Rushing: 9 carries, 66 yards",
  ];
  const news = [
    "Patrick Mahomes named Super Bowl LVIII MVP",
    "Patrick Mahomes leads Chiefs to victory in overtime thriller",
    "Mahomes throws game-winning TD in Super Bowl LVIII",
  ];
  const fantasyInsights = [
    "Mahomes remains a top-tier fantasy QB with consistent high performance",
    "His rushing ability adds valuable points in fantasy leagues",
    "Strong connection with Travis Kelce boosts his fantasy value",
  ];

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{playerName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Overview</Card.Subtitle>
        <Card.Text>
          Patrick Mahomes led the Kansas City Chiefs to a Super Bowl LVIII
          victory and was named the MVP for his outstanding performance in both
          passing and rushing.
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Statistics</Card.Subtitle>
        <ListGroup variant="flush">
          {statistics.map((stat, idx) => (
            <ListGroup.Item key={idx}>{stat}</ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Subtitle className="mb-2 text-muted">News</Card.Subtitle>
        <ListGroup variant="flush">
          {news.map((newsItem, idx) => (
            <ListGroup.Item key={idx}>{newsItem}</ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Subtitle className="mb-2 text-muted">
          Fantasy Insights
        </Card.Subtitle>
        <ListGroup variant="flush">
          {fantasyInsights.map((insight, idx) => (
            <ListGroup.Item key={idx}>{insight}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PlayerProfile;
