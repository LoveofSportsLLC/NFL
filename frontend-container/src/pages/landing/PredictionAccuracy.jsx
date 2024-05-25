// src/pages/landing/PredictionAccuracy.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const PredictionAccuracy = ({ predictionAccuracy }) => (
  <section className="py-6 bg-light">
    <Container>
      <Row>
        <Col>
          <Card className="text-center shadow mb-5">
            <Card.Body>
              <Card.Title as="h2">Prediction Accuracy</Card.Title>
              <Row className="text-center">
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                  </div>
                  <h4>Explained Variance</h4>
                  <p className="lead">{predictionAccuracy.explainedVariance}</p>
                </Col>
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                  </div>
                  <h4>Mean Absolute Error</h4>
                  <p className="lead">{predictionAccuracy.meanAbsoluteError}</p>
                </Col>
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                  </div>
                  <h4>R2 Score</h4>
                  <p className="lead">{predictionAccuracy.r2Score}</p>
                </Col>
                <Col lg={3} className="py-3">
                  <div className="feature-icon bg-primary text-white mb-3">
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                  </div>
                  <h4>Spearman Correlation</h4>
                  <p className="lead">
                    {predictionAccuracy.spearmanCorrelation}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default PredictionAccuracy;
