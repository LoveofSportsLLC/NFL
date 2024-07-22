import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Image, Accordion } from "react-bootstrap";
import CardMenu from "./CardMenu";

// Helper Component for displaying detailed scores per quarter
const QuarterDetails = ({ scores }) => {
  return scores.map((score, index) => (
    <Col key={index} xs="auto" className="text-center">
      <div className="font-medium text-muted">{`Q${index + 1}`}</div>
      <div className="text-lg">{score}</div>
    </Col>
  ));
};


const NFLScoreCard = () => {
  const [gameData, setGameData] = useState({
    date: 'Feb 11, 2024',
    games: [
      {
        id: 'game1', // Assuming each game has a unique ID
        homeTeam: {
          name: 'SF 49ers',
          score: 22,
          logoUrl: 'https://placehold.co/50x50',
        },
        awayTeam: {
          name: 'KC Chiefs',
          score: 25,
          logoUrl: 'https://placehold.co/50x50',
        },
        details: [0, 10, 3, 9, 0, 22], // Assuming these are quarter scores + total
        expanded: false,
      },
      // Add more games as needed
    ],
  });

  const toggleDetails = (index) => {
    let newGames = [...gameData.games];
    newGames[index].expanded = !newGames[index].expanded;
    setGameData({ ...gameData, games: newGames });
  };

  return (
    <Card className="shadow rounded-lg p-4">
      <Card.Body>
        <Row className="justify-content-between mb-4">
          <Col>
            <Card.Title className="text-lg font-bold">
              NFL Live Scores
            </Card.Title>
            <Card.Subtitle className="text-sm text-muted">
              {gameData.date}
            </Card.Subtitle>
          </Col>
          <CardMenu /> {/* Positioned dynamically */}
        </Row>
        {gameData.games.map((game, index) => (
          <Accordion defaultActiveKey="0" className="mb-3" key={game.id}>
            {' '}
            {/* Use game.id as a key */}
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header onClick={() => toggleDetails(index)}>
                {game.homeTeam.name} vs {game.awayTeam.name}
              </Accordion.Header>
              <Accordion.Body>
                <Row className="justify-content-center mb-2">
                  <Image src={game.homeTeam.logoUrl} roundedCircle width="50" />
                  <strong className="mx-3">
                    {game.homeTeam.score} - {game.awayTeam.score}
                  </strong>
                  <Image src={game.awayTeam.logoUrl} roundedCircle width="50" />
                </Row>
                <Row>
                  <QuarterDetails scores={game.details} />
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
        <Button variant="primary" className="py-2 px-4">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NFLScoreCard;