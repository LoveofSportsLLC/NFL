// src/pages/landing/Overview.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faChartLine,
  faUser,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const Overview = ({ overviewData, userEngagement }) => (
  <section className="py-6">
    <Container>
      <Row>
        <Col>
          <Card className="text-center shadow mb-5">
            <Card.Body>
              <Card.Title as="h2">Overview</Card.Title>
              <Row className="text-center">
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faChartBar} size="2x" />
                  </div>
                  <h4>Total Matches Analyzed</h4>
                  <p className="lead">{overviewData.totalMatches}</p>
                </Col>
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                  </div>
                  <h4>Total Players Tracked</h4>
                  <p className="lead">{overviewData.totalPlayers}</p>
                </Col>
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </div>
                  <h4>Active Users</h4>
                  <p className="lead">{overviewData.activeUsers}</p>
                </Col>
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faClock} size="2x" />
                  </div>
                  <h4>Time Spent</h4>
                  <p className="lead">{userEngagement.timeSpent}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Overview;
