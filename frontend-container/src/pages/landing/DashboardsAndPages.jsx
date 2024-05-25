// src/pages/landing/DashboardsAndPages.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import screenshotPlayerStats from "../../assets/img/photos/screenshot-player-stats.png";
import screenshotTeamStats from "../../assets/img/photos/screenshot-team-stats.png";
import screenshotGameAnalysis from "../../assets/img/photos/screenshot-game-analysis.png";
import screenshotDashboard4 from "../../assets/img/photos/screenshot-dashboard-4.png";
import screenshotDashboard5 from "../../assets/img/photos/screenshot-dashboard-5.png";
import screenshotDashboard6 from "../../assets/img/photos/screenshot-dashboard-6.png";

const DashboardsAndPages = () => (
  <section className="py-6 bg-white" id="demos">
    <Container className="position-relative z-3">
      <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="mb-4">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  Demos
                </span>
                <h2 className="h1 mb-3">
                  Explore our NFL Statistics Dashboards
                </h2>
                <p className="text-muted fs-lg">
                  Discover the power of our analytics with various NFL
                  statistics dashboards and pages. Dive deep into player
                  performance, team stats, and game analysis. Get real-time
                  insights to stay ahead in the game.
                </p>
              </div>
            </div>
          </Row>
          <Row>
            <Col md="4" className="py-3">
              <NavLink
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/player-stats"
              >
                <img
                  src={screenshotPlayerStats}
                  className="img-fluid rounded-lg landing-img"
                  alt="NFL Player Stats Dashboard"
                />
              </NavLink>
              <h4>NFL Player Stats</h4>
              <p className="text-muted fs-lg">
                Dive into detailed player statistics, including performance
                metrics, historical data, and player comparisons. Stay informed
                about your favorite NFL players' performance.
              </p>
            </Col>
            <Col md="4" className="py-3">
              <NavLink
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/team-stats"
              >
                <img
                  src={screenshotTeamStats}
                  className="img-fluid rounded-lg landing-img"
                  alt="NFL Team Stats Dashboard"
                />
              </NavLink>
              <h4>NFL Team Stats</h4>
              <p className="text-muted fs-lg">
                Explore comprehensive team statistics, including win-loss
                records, offensive and defensive performance, and more. Analyze
                team strategies and trends.
              </p>
            </Col>
            <Col md="4" className="py-3">
              <NavLink
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/game-analysis"
              >
                <img
                  src={screenshotGameAnalysis}
                  className="img-fluid rounded-lg landing-img"
                  alt="NFL Game Analysis Dashboard"
                />
              </NavLink>
              <h4>NFL Game Analysis</h4>
              <p className="text-muted fs-lg">
                Get in-depth game analysis with real-time data. Analyze game
                performance, key plays, and player contributions. Stay ahead
                with data-driven insights.
              </p>
            </Col>
            <Col md="4" className="py-3">
              <NavLink
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/dashboard-4"
              >
                <img
                  src={screenshotDashboard4}
                  className="img-fluid rounded-lg landing-img"
                  alt="NFL Dashboard 4"
                />
              </NavLink>
              <h4>NFL Dashboard 4</h4>
              <p className="text-muted fs-lg">
                Description for NFL Dashboard 4. Customize this text.
              </p>
            </Col>
            <Col md="4" className="py-3">
              <NavLink
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/dashboard-5"
              >
                <img
                  src={screenshotDashboard5}
                  className="img-fluid rounded-lg landing-img"
                  alt="NFL Dashboard 5"
                />
              </NavLink>
              <h4>NFL Dashboard 5</h4>
              <p className="text-muted fs-lg">
                Description for NFL Dashboard 5. Customize this text.
              </p>
            </Col>
            <Col md="4" className="py-3">
              <NavLink
                className="d-block mb-3 mx-1"
                target="_blank"
                rel="noreferrer"
                to="/dashboard/dashboard-6"
              >
                <img
                  src={screenshotDashboard6}
                  className="img-fluid rounded-lg landing-img"
                  alt="NFL Dashboard 6"
                />
              </NavLink>
              <h4>NFL Dashboard 6</h4>
              <p className="text-muted fs-lg">
                Description for NFL Dashboard 6. Customize this text.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

export default DashboardsAndPages;
