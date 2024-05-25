// src/pages/landing/Statistics/Games/GameResults.jsx
import React from "react";
import { Table } from "react-bootstrap";

const GameResults = () => {
  // Dummy data for example
  const results = [
    { date: "2023-10-01", teams: "Team A vs Team B", score: "20-17" },
    { date: "2023-10-02", teams: "Team C vs Team D", score: "14-21" },
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Teams</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, idx) => (
          <tr key={idx}>
            <td>{result.date}</td>
            <td>{result.teams}</td>
            <td>{result.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GameResults;
