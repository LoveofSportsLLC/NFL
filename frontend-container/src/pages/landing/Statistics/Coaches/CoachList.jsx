// src/pages/landing/Statistics/Coaches/CoachList.jsx
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CoachList = () => {
  // Dummy data for example
  const coaches = ['Coach A', 'Coach B', 'Coach C'];

  return (
    <ListGroup>
      {coaches.map((coach, idx) => (
        <ListGroup.Item key={idx}>{coach}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CoachList;
