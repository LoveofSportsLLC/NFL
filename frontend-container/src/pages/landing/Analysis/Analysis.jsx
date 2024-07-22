import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import draft1 from '/analysis/draft1.webp';
import draft2 from '/analysis/draft2.webp';
import draft3 from '/analysis/draft3.webp';
import draft4 from '/analysis/draft4.webp';
import draft5 from '/analysis/draft5.webp';
import draft6 from '/analysis/draft6.png';
import fantasy1 from '/analysis/fantasy1.webp';
import fantasy2 from '/analysis/fantasy2.webp';
import fantasy3 from '/analysis/fantasy3.webp';
import fantasy4 from '/analysis/fantasy4.webp';
import fantasy5 from '/analysis/fantasy5.webp';
import fantasy6 from '/analysis/fantasy6.webp';
import game1 from '/analysis/match1.webp';
import game2 from '/analysis/match2.webp';
import game3 from '/analysis/match3.webp';
import game4 from '/analysis/match4.webp';
import v1 from '/vis/v1.png';
import v2 from '/vis/v2.png';
import v3 from '/vis/v3.png';
import v4 from '/vis/v4.png';
import v5 from '/vis/v5.png';
import v6 from '/vis/v6.png';
import v7 from '/vis/v7.png';
import v8 from '/vis/v8.png';
import v9 from '/vis/v9.png';
import v10 from '/vis/v10.png';
import v11 from '/vis/v11.png';
import v12 from '/vis/v12.png';
import v13 from '/vis/v13.png';
import v14 from '/vis/v14.png';
import v15 from '/vis/v15.png';
import v16 from '/vis/v16.png';
import v17 from '/vis/v17.png';
import v18 from '/vis/v18.png';
import v19 from '/vis/v19.png';
import v20 from '/vis/v20.png';
import v21 from '/vis/v21.png';

const visImages = [
  v1,
  v2,
  v3,
  v4,
  v5,
  v6,
  v7,
  v8,
  v9,
  v10,
  v11,
  v12,
  v13,
  v14,
  v15,
  v16,
  v17,
  v18,
  v19,
  v20,
  v21,
];

const Analysis = () => {
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite fallback loop
    e.target.src = 'Logo.png'; // Fallback image path
  };

  return (
    <Container className="py-5">
      <Card
        className="p-4"
        style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '10px',
        }}
      >
        <Row className="mb-4">
          <Col md="12" className="text-center">
            <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
              Analysis
            </span>
            <h2 className="h1 mb-3">In-Depth NFL Analysis</h2>
            <p className="text-muted fs-lg">
              Get advanced insights and predictions powered by AI, focusing on
              performance metrics, team and game analysis, fantasy football, and
              draft analysis.
            </p>
          </Col>
        </Row>

        {/* Advanced Performance Metrics */}
        <Row className="text-start mb-4">
          <Col md="12" className="text-center">
            <h3>Advanced Performance Metrics</h3>
            <p className="fs-lg">
              Dive into comprehensive player performance metrics and utilize
              advanced stats to make smart decisions. Track player progress
              throughout the season.
            </p>
            <Row className="mb-4">
              <Col md="6" className="mb-3 text-center">
                <Carousel>
                  {visImages.map((src, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        className="d-block w-100"
                        src={src}
                        alt={`Visualization ${idx + 1}`}
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col md="6" className="mb-3 text-center">
                <Carousel>
                  {visImages.map((src, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        className="d-block w-100"
                        src={src}
                        alt={`Visualization ${idx + 1}`}
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Analysis Sections */}
        <Row className="text-start mb-4">
          {/* Real Time Team/Game Analysis Predictions Via AI */}
          <Col md="4" className="text-center">
            <h3>Real Time Team/Game Analysis Predictions Via AI</h3>
            <p className="fs-lg">
              Gain insights into team strategies and game predictions using
              AI-powered analytics. Stay ahead with real-time data-driven
              predictions during every match.
            </p>
            <Carousel>
              {[game1, game2, game3, game4].map((src, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={src}
                    alt={`Game Analysis ${idx + 1}`}
                    loading="lazy"
                    onError={handleImageError}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* Real Time Fantasy Analysis and Predictions via AI */}
          <Col md="4" className="text-center">
            <h3>Real Time Fantasy Analysis and Predictions via AI</h3>
            <p className="fs-lg">
              Enhance your fantasy football experience with real-time analysis
              and AI-driven predictions. Make informed decisions based on
              comprehensive data insights.
            </p>
            <Carousel>
              {[fantasy1, fantasy2, fantasy3, fantasy4, fantasy5, fantasy6].map(
                (src, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={src}
                      alt={`Fantasy Analysis ${idx + 1}`}
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </Carousel.Item>
                ),
              )}
            </Carousel>
          </Col>

          {/* NFL Draft Analysis */}
          <Col md="4" className="text-center">
            <h3>NFL Draft Analysis</h3>
            <p className="fs-lg">
              Get comprehensive analysis of NFL draft prospects. Understand
              player strengths, weaknesses, and potential impact on their new
              teams.
            </p>
            <Carousel>
              {[draft1, draft2, draft3, draft4, draft5, draft6].map(
                (src, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={src}
                      alt={`Draft Analysis ${idx + 1}`}
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </Carousel.Item>
                ),
              )}
            </Carousel>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Analysis;
