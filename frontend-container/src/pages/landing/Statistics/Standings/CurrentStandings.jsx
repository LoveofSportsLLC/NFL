// src/pages/landing/Statistics/Standings/CurrentStandings.jsx
import React from "react";
import { Table } from "react-bootstrap";

const CurrentStandings = () => {
  // Dummy data for example
  const standings = [
    { team: "Team A", wins: 10, losses: 2 },
    { team: "Team B", wins: 8, losses: 4 },
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Team</th>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team, idx) => (
          <tr key={idx}>
            <td>{team.team}</td>
            <td>{team.wins}</td>
            <td>{team.losses}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CurrentStandings;
