// src/pages/landing/ai/PredictionsAccuracy.jsx
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'react-google-charts';

const PredictionsAccuracy = () => {
  const accuracyData = {
    explainedVariance: '85%', // Sample data
    meanAbsoluteError: '0.5', // Sample data
    r2Score: '0.9', // Sample data
    spearmanCorrelation: '0.95', // Sample data
    confidenceInterval: '± 0.05', // Sample data
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click for more info!
    </Tooltip>
  );

  const data = [
    ['Play', 'Predicted Score', 'Actual Score'],
    ['Play 1', 14, 13],
    ['Play 2', 21, 20],
    ['Play 3', 28, 26],
    ['Play 4', 35, 32],
  ];

  const options = {
    title: 'Example of Model Predictions vs Actual Scores',
    hAxis: { title: 'Play Number', minValue: 0, maxValue: 4 },
    vAxis: { title: 'Score', minValue: 0, maxValue: 40 },
    legend: 'bottom',
  };

  return (
    <section className="py-6 bg-light">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                <h4 className="mb-3">Model Overview</h4>
                <p>
                  Our AI model leverages advanced algorithms and machine
                  learning to provide real-time updates on Fantasy Player points
                  and game scores. The model integrates live data feeds to offer
                  the most accurate predictions and insights, empowering users
                  to stay ahead in their fantasy leagues and sports bets.
                </p>
                <ul>
                  <li>
                    <strong>Real-time updates:</strong> Get instant insights as
                    games progress.
                  </li>
                  <li>
                    <strong>Advanced algorithms:</strong> Uses machine learning
                    for highly accurate predictions.
                  </li>
                  <li>
                    <strong>Transparency:</strong> See the data and understand
                    how the model works.
                  </li>
                </ul>
              </Card.Body>
            </Card>
            <Card className="shadow mt-4">
              <Card.Body>
                <h4 className="mb-3">Predictions</h4>
                <p>
                  Our AI model provides predictions on player performance, game
                  outcomes, and scoring updates. It helps users make informed
                  decisions in fantasy football leagues and strategic bets by
                  giving them data-driven insights.
                </p>
                <ul>
                  <li>
                    <strong>Player Performance:</strong> Predicts players’
                    scores based on live data.
                  </li>
                  <li>
                    <strong>Game Outcomes:</strong> Projects winners and final
                    scores.
                  </li>
                  <li>
                    <strong>Scoring Updates:</strong> Real-time updates on game
                    scores.
                  </li>
                </ul>
              </Card.Body>
            </Card>
            <Card className="shadow mt-4">
              <Card.Body>
                <h4 className="mb-3">Model Insights</h4>
                <p>
                  Insights generated from the AI model include performance
                  metrics for players, projections on game outcomes, and trends
                  in team performance. The model analyzes historical data,
                  player statistics, and game dynamics to deliver actionable
                  insights.
                </p>
                <ul>
                  <li>
                    <strong>Performance Metrics:</strong> Detailed stats and
                    insights for each player.
                  </li>
                  <li>
                    <strong>Game Projections:</strong> Anticipates game outcomes
                    based on data analysis.
                  </li>
                  <li>
                    <strong>Team Trends:</strong> Observes team performance and
                    strategy changes.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="shadow mb-5">
              <Card.Body>
                <h3 className="mb-3">Prediction Accuracy</h3>
                <Row className="text-center">
                  <Col lg={6} className="py-3">
                    <Accordion defaultActiveKey={null}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Explained Variance: {accuracyData.explainedVariance}
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="ms-2"
                            />
                          </OverlayTrigger>
                        </Accordion.Header>
                        <Accordion.Body>
                          <small>
                            Explained Variance tells us how much of the total
                            variation in player points can be explained by our
                            AI model. For example, if it is 85%, that means 85%
                            of the variation in the points is captured by the
                            model, giving you a good understanding of player
                            performance.
                          </small>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                  <Col lg={6} className="py-3">
                    <Accordion defaultActiveKey={null}>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          Mean Absolute Error (MAE):{' '}
                          {accuracyData.meanAbsoluteError}
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="ms-2"
                            />
                          </OverlayTrigger>
                        </Accordion.Header>
                        <Accordion.Body>
                          <small>
                            Mean Absolute Error (MAE) shows how close our
                            model’s predictions are to the actual results. The
                            lower this number, the better the model is at
                            predicting real outcomes. If the MAE is 0.5, it
                            means, on average, our predictions are only 0.5
                            points away from the actual score.
                          </small>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                  <Col lg={6} className="py-3">
                    <Accordion defaultActiveKey={null}>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          R2 Score: {accuracyData.r2Score}
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="ms-2"
                            />
                          </OverlayTrigger>
                        </Accordion.Header>
                        <Accordion.Body>
                          <small>
                            R2 Score, or R-squared, measures how well our
                            model’s predictions fit the real data. A score of 1
                            means a perfect fit, while 0 means no fit. An R2
                            score of 0.9 indicates that the model explains 90%
                            of the variability in the player scores, meaning
                            it's very accurate.
                          </small>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                  <Col lg={6} className="py-3">
                    <Accordion defaultActiveKey={null}>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          Spearman Correlation:{' '}
                          {accuracyData.spearmanCorrelation}
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="ms-2"
                            />
                          </OverlayTrigger>
                        </Accordion.Header>
                        <Accordion.Body>
                          <small>
                            Spearman Correlation measures the strength and
                            direction of the relationship between our model's
                            predictions and the actual outcomes. A value closer
                            to 1 indicates a strong positive relationship,
                            meaning that as our model's predictions go up, the
                            actual outcomes also tend to go up.
                          </small>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                  <Col lg={12} className="py-3">
                    <Accordion defaultActiveKey={null}>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>
                          Confidence Interval: {accuracyData.confidenceInterval}
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="ms-2"
                            />
                          </OverlayTrigger>
                        </Accordion.Header>
                        <Accordion.Body>
                          <small>
                            Confidence Interval indicates the range within which
                            we expect our predictions to fall a certain
                            percentage of the time. For example, a confidence
                            interval of ± 0.05 means we are confident that the
                            true score will be within this range most of the
                            time.
                          </small>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
                <Row>
                  <Col className="py-3">
                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="400px"
                      data={data}
                      options={options}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="py-3">
                    <p>
                      Note: Several factors can affect the accuracy of our
                      model:
                    </p>
                    <ul>
                      <li>
                        Rule changes: Modifications in game rules can impact
                        player performance and outcomes, which might not be
                        immediately reflected in the model.
                      </li>
                      <li>
                        Injuries: Unexpected injuries to key players can lead to
                        significant changes in game dynamics and player
                        performances.
                      </li>
                      <li>
                        Weather conditions: Weather can affect game strategies
                        and player performances.
                      </li>
                      <li>
                        Home/Away games: Teams may perform differently at home
                        compared to away games.
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PredictionsAccuracy;
