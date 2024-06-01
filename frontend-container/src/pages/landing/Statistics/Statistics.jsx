// src/pages/landing/Statistics/Statistics.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TeamsPreview from "./Teams/TeamsPreview";
import PlayersPreview from "./Players/PlayersPreview";
import GamesPreview from "./Games/GamesPreview";
import StandingsPreview from "./Standings/StandingsPreview";
import CoachesPreview from "./Coaches/CoachesPreview";

const Statistics = () => {
  return (
    <section className="py-5" id="statistics">
      <Container>
        <Row>
          <Col md="12" className="mx-auto text-center">
            <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
              Statistics
            </span>
            <h2 className="h1 mb-5">Explore Our NFL Statistics</h2>
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-3">
            <h3>Teams</h3>
            <TeamsPreview />
          </Col>
          <Col md="4" className="mb-3">
            <h3>Players</h3>
            <PlayersPreview />
          </Col>
          <Col md="4" className="mb-3">
            <h3>Games</h3>
            <GamesPreview />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-3">
            <h3>Standings</h3>
            <StandingsPreview />
          </Col>
          <Col md="6" className="mb-3">
            <h3>Coaches</h3>
            <CoachesPreview />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Statistics;
