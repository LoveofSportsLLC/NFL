// src/pages/landing/Features.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faFootballBall,
  faClipboardList,
  faHistory,
  faChartBar,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';

const Features = () => (
  <section className="py-6" id="features">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2 className="h1">Powerful Analytics for Football Enthusiasts</h2>
            <p className="text-muted text-lg">
              From player statistics to advanced team analysis, our platform
              offers all the tools you need for a successful season.
            </p>
          </div>
          <Row className="text-start">
            {/* Advanced Performance Metrics */}
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Advanced Performance Metrics</h4>
                  <p className="fs-lg">
                    Dive into comprehensive player performance metrics and
                    utilize advanced stats to make smart decisions. Track player
                    progress throughout the season.
                  </p>
                </div>
              </div>
            </Col>
            {/* Team Analysis */}
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faFootballBall} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Team Analysis Tools</h4>
                  <p className="fs-lg">
                    Analyze team strategies, strengths, and weaknesses with our
                    team-focused analytics. Gain insights into win-loss records,
                    offensive and defensive performance, and more.
                  </p>
                </div>
              </div>
            </Col>
            {/* Game Insights */}
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faClipboardList} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">In-Depth Game Insights</h4>
                  <p className="fs-lg">
                    Get real-time game analysis with key play breakdowns, player
                    contributions, and game-changing moments. Stay ahead with
                    data-driven insights during every match.
                  </p>
                </div>
              </div>
            </Col>
            {/* Historical Data */}
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faHistory} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Historical Data Repository</h4>
                  <p className="fs-lg">
                    Access a rich historical data repository to compare past
                    seasons, players, and teams. Make informed decisions based
                    on historical trends.
                  </p>
                </div>
              </div>
            </Col>
            {/* Data Visualization */}
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faChartBar} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Data Visualization</h4>
                  <p className="fs-lg">
                    Visualize complex statistics with interactive charts and
                    graphs. Understand data at a glance and share insights with
                    your team and fans.
                  </p>
                </div>
              </div>
            </Col>
            {/* User-Friendly Interface */}
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <FontAwesomeIcon icon={faDesktop} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">User-Friendly Interface</h4>
                  <p className="fs-lg">
                    Our intuitive and easy-to-use interface ensures that both
                    beginners and experts can navigate and utilize our analytics
                    tools effectively.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Features;
