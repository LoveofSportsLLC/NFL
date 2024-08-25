// src/pages/landing/Statistics/Coaches/CoachProfile.jsx
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CoachProfile = () => {
  // Dummy data for example
  const coachName = 'Coach A';
  const statistics = ['Win 1', 'Win 2', 'Win 3'];
  const news = ['News 1', 'News 2', 'News 3'];

  return (
    <Card>
      <Card.Body>
        <Card.Title>{coachName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Overview</Card.Subtitle>
        <Card.Text>Coach&rsquo;s bio and career summary.</Card.Text>
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
      </Card.Body>
    </Card>
  );
};

export default CoachProfile;
