// src/pages/landing/Statistics/Statistics.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TeamsPreview from "./Teams/TeamsPreview";
import PlayersPreview from "./Players/PlayersPreview";
import GamesPreview from "./Games/GamesPreview";
import StandingsPreview from "./Standings/StandingsPreview";
import CoachesPreview from "./Coaches/CoachesPreview";

const Statistics = () => {
  return (
    <section className="py-5" id="statistics">
      <Container>
        <Card
          className="p-4"
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "10px",
          }}
        >
          <Row>
            <Col md="12" className="mx-auto text-center">
              <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                Statistics
              </span>
              <h2 className="h1 mb-5">Explore Our NFL Statistics</h2>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="mb-3 text-center" id="teams">
              <h3>Teams</h3>
              <p className="text-muted fs-lg">
                Analyze team performance, strategies, and outcomes with detailed
                statistics. Compare teams across various metrics and gain
                insights into their strengths and weaknesses.
              </p>
              <TeamsPreview />
            </Col>
            <Col md="4" className="mb-3 text-center" id="players">
              <h3>Players</h3>
              <p className="text-muted fs-lg">
                Explore individual player stats, performance metrics, and
                historical data. Keep track of your favorite players and their
                season progress.
              </p>
              <PlayersPreview />
            </Col>
            <Col md="4" className="mb-3 text-center" id="games">
              <h3>Games</h3>
              <p className="text-muted fs-lg">
                Dive into game statistics, including play-by-play breakdowns,
                key moments, and overall game performance. Understand the
                dynamics of each match.
              </p>
              <GamesPreview />
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mb-3 text-center" id="standings">
              <h3>Standings</h3>
              <p className="text-muted fs-lg">
                Stay updated with the latest NFL standings. See how teams rank
                in their divisions and conferences, and track their journey
                through the season.
              </p>
              <StandingsPreview />
            </Col>
            <Col md="6" className="mb-3 text-center" id="coaches">
              <h3>Coaches</h3>
              <p className="text-muted fs-lg">
                Analyze coaching strategies, performance, and historical data.
                Get insights into coaching decisions and their impact on team
                performance.
              </p>
              <CoachesPreview />
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
};

export default Statistics;
