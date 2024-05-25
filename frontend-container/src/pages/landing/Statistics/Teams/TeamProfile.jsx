// src/pages/landing/Statistics/Teams/TeamProfile.jsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const TeamProfile = () => {
  const teamName = "Kansas City Chiefs";
  const statistics = [
    "Passing: Patrick Mahomes, 34/46, 333 yards, 2 TDs, 1 INT",
    "Rushing: Patrick Mahomes, 9 carries, 66 yards",
    "Receiving: Travis Kelce, 9 receptions, 93 yards",
  ];
  const recentGames = [
    "Super Bowl LVIII: Kansas City Chiefs 25, San Francisco 49ers 22",
  ];
  const news = [
    "Kansas City Chiefs win Super Bowl LVIII in dramatic overtime fashion",
    "Patrick Mahomes named Super Bowl LVIII MVP",
    "Super Bowl parade celebrates Chiefs' victory",
  ];
  const keyPlayers = ["Patrick Mahomes", "Travis Kelce", "Isiah Pacheco"];

  return (
    <Card>
      <Card.Body>
        <Card.Title>{teamName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Overview</Card.Subtitle>
        <Card.Text>
          Super Bowl LVIII Champions, led by MVP Patrick Mahomes in an overtime
          thriller against the San Francisco 49ers.
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Statistics</Card.Subtitle>
        <ListGroup variant="flush">
          {statistics.map((stat, idx) => (
            <ListGroup.Item key={idx}>{stat}</ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Subtitle className="mb-2 text-muted">Recent Games</Card.Subtitle>
        <ListGroup variant="flush">
          {recentGames.map((game, idx) => (
            <ListGroup.Item key={idx}>{game}</ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Subtitle className="mb-2 text-muted">News</Card.Subtitle>
        <ListGroup variant="flush">
          {news.map((newsItem, idx) => (
            <ListGroup.Item key={idx}>{newsItem}</ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Subtitle className="mb-2 text-muted">Key Players</Card.Subtitle>
        <ListGroup variant="flush">
          {keyPlayers.map((player, idx) => (
            <ListGroup.Item key={idx}>{player}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default TeamProfile;
