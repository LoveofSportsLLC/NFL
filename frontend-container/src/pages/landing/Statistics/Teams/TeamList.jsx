// src/pages/landing/Statistics/Teams/TeamList.jsx
import React from "react";
import { ListGroup } from "react-bootstrap";

const TeamList = () => {
  // Dummy data for example
  const teams = [
    "Bears",
    "Bengals",
    " Bills",
    "Broncos",
    "Browns",
    "Buccaneers",
    "Cardinals",
    "Chargers",
    "Chiefs",
    "Colts",
    "Commanders",
    "Cowboys",
    "Dolphins",
    "Eagles",
    "Falcons",
    "Giants",
    "Jaguars",
    "Jets",
    "Lions",
    "Packers",
    "Panthers",
    "Patriots",
    "Raiders",
    "Rams",
    "Ravens",
    "Saints",
    "Seahawks",
    "Steelers",
    "Texans",
    "Titans",
    "Vikings",
  ];

  return (
    <ListGroup>
      {teams.map((team, idx) => (
        <ListGroup.Item key={idx}>{team}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TeamList;
