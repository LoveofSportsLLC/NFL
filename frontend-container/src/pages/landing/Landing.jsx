// src/pages/landing/Landing.jsx
import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./Navigation/Navigation";
import Intro from "./Intro/Intro";
import Integrations from "./BottomPage/Integrations";
import Footer from "./BottomPage/Footer";
import About from "./Aboutus/About";

// Lazy-loaded components
const CombinedComponent = lazy(() => import("./Dashboards/CombinedComponent"));
const Dashboards = lazy(() => import("./Dashboards/Dashboards"));
const Analysis = lazy(() => import("./Analysis/Analysis"));
const Statistics = lazy(() => import("./Statistics/Statistics"));
const News = lazy(() => import("./News/News"));
const ModelOverview = lazy(() => import("./ai/ModelOverview"));
const ModelInsights = lazy(() => import("./ai/ModelInsights"));
const Predictions = lazy(() => import("./ai/Predictions"));
const PredictionsAccuracy = lazy(() => import("./ai/PredictionsAccuracy"));
const Community = lazy(() => import("./Community/Community"));

const FUNCTION_API_URL =
  "https://<your-function-app-name>.azurewebsites.net/api/<function-name>";

const Landing = () => {
  const [showInteractive, setShowInteractive] = useState(false);
  const [predictionAccuracy, setPredictionAccuracy] = useState(null);

  useEffect(() => {
    if (showInteractive) {
      const script = document.createElement("script");
      script.src = "path/to/interactive/football/script.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const fetchPredictionAccuracy = async () => {
      try {
        const response = await fetch(FUNCTION_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // Adjust payload if needed
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPredictionAccuracy(data);
      } catch (error) {
        console.error("Error fetching prediction accuracy data:", error);
      }
    };

    fetchPredictionAccuracy();
  }, [showInteractive]);

  return (
    <React.Fragment>
      <Navigation />
      {/* Intro Section */}
      <Intro handleDonateClick={() => setShowInteractive(!showInteractive)} />

      <Suspense fallback={<div>Loading...</div>}>
        {/* Team Selector and Design Options */}
        <section className="bg-light py-5" id="team-selector">
          <CombinedComponent />
        </section>

        {/* Dashboards */}
        <section className="py-5" id="dashboards">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  Analysis
                </span>
                <h3 className="h1 mb-5">Dashboards</h3>
              </Col>
              <Dashboards />
            </Row>
          </Container>
        </section>

        {/* Statistics */}
        <section className="bg-light py-5" id="statistics">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  Statistics
                </span>
                <h3 className="h1 mb-5">Explore Our NFL Statistics</h3>
              </Col>
              <Statistics />
            </Row>
          </Container>
        </section>

        {/* Latest News */}
        <section className="py-5" id="news">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  News
                </span>
                <h3 className="h1 mb-5">Latest Headlines</h3>
              </Col>
              <News />
            </Row>
          </Container>
        </section>

        {/* AI Overview */}
        <section className="bg-light py-5" id="ai-overview">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  AI Overview
                </span>
                <h3 className="h1 mb-5">AI Model Insights & Predictions</h3>
              </Col>
              <Col md="6">
                <ModelOverview />
              </Col>
              <Col md="6">
                <ModelInsights />
              </Col>
              <Col md="6">
                <Predictions />
              </Col>
              <Col md="6">
                <PredictionsAccuracy predictionAccuracy={predictionAccuracy} />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Community Forum */}
        <section className="py-5" id="community">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  Community Forum
                </span>
                <h3 className="h1 mb-5">Join the Discussion</h3>
              </Col>
              <Community />
            </Row>
          </Container>
        </section>
      </Suspense>

      {/* Integrations */}
      <section className="bg-light py-5">
        <Integrations />
      </section>

      {/* AboutUs */}
      <section className="py-5" id="about">
        <About />
      </section>

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Landing;
