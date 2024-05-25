// src/pages/landing/Statistics/Games/GameSchedule.jsx
import React from "react";
import { Table } from "react-bootstrap";

const GameSchedule = () => {
  // Dummy data for example
  const schedule = [
    { date: "2023-10-01", teams: "Team A vs Team B" },
    { date: "2023-10-02", teams: "Team C vs Team D" },
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Teams</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((game, idx) => (
          <tr key={idx}>
            <td>{game.date}</td>
            <td>{game.teams}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GameSchedule;
