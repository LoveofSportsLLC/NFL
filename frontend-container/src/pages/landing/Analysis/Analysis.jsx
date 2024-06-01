import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faClipboardList,
  faFootballBall,
} from "@fortawesome/free-solid-svg-icons";
import player1 from "/analysis/player1.webp";
import player2 from "/analysis/player2.webp";
import player3 from "/analysis/player3.webp";
import player4 from "/analysis/player4.webp";
import player5 from "/analysis/player5.webp";
import player6 from "/analysis/player6.webp";
import team1 from "/analysis/team1.webp";
import team2 from "/analysis/team2.webp";
import team3 from "/analysis/team3.webp";
import game1 from "/analysis/match1.webp";
import game2 from "/analysis/match2.webp";
import game3 from "/analysis/match3.webp";
import game4 from "/analysis/match4.webp";
import v1 from "/vis/v1.png";
import v2 from "/vis/v2.png";
import v3 from "/vis/v3.png";
import v4 from "/vis/v4.png";
import v5 from "/vis/v5.png";
import v6 from "/vis/v6.png";
import v7 from "/vis/v7.png";
import v8 from "/vis/v8.png";
import v9 from "/vis/v9.png";
import v10 from "/vis/v10.png";
import v11 from "/vis/v11.png";
import v12 from "/vis/v12.png";
import v13 from "/vis/v13.png";
import v14 from "/vis/v14.png";
import v15 from "/vis/v15.png";
import v16 from "/vis/v16.png";
import v17 from "/vis/v17.png";
import v18 from "/vis/v18.png";
import v19 from "/vis/v19.png";
import v20 from "/vis/v20.png";
import v21 from "/vis/v21.png";
import { NavLink } from "react-router-dom";

// List of visualization images
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
    e.target.src = "/src/assets/img/Logo.png"; // Fallback image path
  };

  // Shuffle images randomly
  const shuffleImages = (images) => {
    return images.sort(() => Math.random() - 0.5);
  };

  return (
    <section className="py-6 bg-white" id="analysis">
      <Container className="position-relative z-3">
        <Row>
          <Col md="12" className="mx-auto text-center">
            <div className="mb-4">
              <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                Analysis
              </span>
              <h2 className="h1 mb-3">In-Depth NFL Analysis</h2>
              <p className="text-muted fs-lg">
                Get real-time game analysis with key play breakdowns, player
                contributions, and game-changing moments. Stay ahead with
                data-driven insights during every match.
              </p>
            </div>
          </Col>
        </Row>

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
                  {shuffleImages(visImages).map((src, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        className="d-block w-100 img-lazy"
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
                  {shuffleImages(visImages).map((src, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        className="d-block w-100 img-lazy"
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

        <Row className="mb-4">
          <Col md="4" className="text-center">
            <h4>Team Analysis Tools</h4>
            <p className="text-muted fs-lg">
              Analyze team strategies, strengths, and weaknesses with our
              team-focused analytics. Gain insights into win-loss records,
              offensive and defensive performance, and more.
            </p>
            <Carousel>
              {[team1, team2, team3].map((src, idx) => (
                <Carousel.Item key={idx}>
                  <NavLink
                    className="d-block w-100 img-lazy"
                    target="_blank"
                    rel="noreferrer"
                    to={`/dashboard/team-stats/${idx + 1}`}
                  >
                    <img
                      src={src}
                      className="img-fluid rounded-lg landing-img img-lazy"
                      alt={`NFL Team ${idx + 1} Stats Dashboard`}
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </NavLink>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col md="4" className="text-center">
            <h4>In-Depth Game Insights</h4>
            <p className="text-muted fs-lg">
              Get real-time game analysis with key play breakdowns, player
              contributions, and game-changing moments. Stay ahead with
              data-driven insights during every match.
            </p>
            <Carousel>
              {[game1, game2, game3, game4].map((src, idx) => (
                <Carousel.Item key={idx}>
                  <NavLink
                    className="d-block w-100 img-lazy"
                    target="_blank"
                    rel="noreferrer"
                    to={`/dashboard/game-analysis/${idx + 1}`}
                  >
                    <img
                      src={src}
                      className="img-fluid rounded-lg landing-img img-lazy"
                      alt={`NFL Game ${idx + 1} Analysis Dashboard`}
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </NavLink>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col md="4" className="text-center">
            <h4>NFL Player Stats</h4>
            <p className="text-muted fs-lg mb-3">
              Dive into detailed player statistics, including performance
              metrics, historical data, and player comparisons. Stay informed
              about your favorite NFL players' performance.
            </p>
            <Carousel>
              {[player1, player2, player3, player4, player5, player6].map(
                (src, idx) => (
                  <Carousel.Item key={idx}>
                    <NavLink
                      className="d-block w-100 img-lazy"
                      target="_blank"
                      rel="noreferrer"
                      to={`/dashboard/player-stats/${idx + 1}`}
                    >
                      <img
                        src={src}
                        className="img-fluid rounded-lg landing-img img-lazy"
                        alt={`NFL Player ${idx + 1} Stats Dashboard`}
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </NavLink>
                  </Carousel.Item>
                ),
              )}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Analysis;
