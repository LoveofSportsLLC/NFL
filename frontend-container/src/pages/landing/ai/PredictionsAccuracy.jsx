// src/pages/landing/ai/PredictionsAccuracy.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

// Replace with your Azure Function URL which handles the proxying
const FUNCTION_API_URL =
  "https://<your-function-app-name>.azurewebsites.net/api/<function-name>";

const PredictionsAccuracy = ({ predictionAccuracy }) => {
  const [accuracyData, setAccuracyData] = useState(null);

  useEffect(() => {
    const fetchPredictionAccuracy = async () => {
      try {
        const response = await axios.post(
          FUNCTION_API_URL,
          {
            /* request payload if needed */
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 200 && response.data) {
          setAccuracyData(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching prediction accuracy data:", error);
      }
    };

    fetchPredictionAccuracy();
  }, []);

  return (
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
                    <p className="lead">
                      {accuracyData?.explainedVariance ?? "N/A"}
                    </p>
                  </Col>
                  <Col lg={3} className="py-3">
                    <div className="feature-icon bg-primary text-white mb-3">
                      <FontAwesomeIcon icon={faChartLine} size="2x" />
                    </div>
                    <h4>Mean Absolute Error</h4>
                    <p className="lead">
                      {accuracyData?.meanAbsoluteError ?? "N/A"}
                    </p>
                  </Col>
                  <Col lg={3} className="py-3">
                    <div className="feature-icon bg-primary text-white mb-3">
                      <FontAwesomeIcon icon={faChartLine} size="2x" />
                    </div>
                    <h4>R2 Score</h4>
                    <p className="lead">{accuracyData?.r2Score ?? "N/A"}</p>
                  </Col>
                  <Col lg={3} className="py-3">
                    <div className="feature-icon bg-primary text-white mb-3">
                      <FontAwesomeIcon icon={faChartLine} size="2x" />
                    </div>
                    <h4>Spearman Correlation</h4>
                    <p className="lead">
                      {accuracyData?.spearmanCorrelation ?? "N/A"}
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
};

export default PredictionsAccuracy;
