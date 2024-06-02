// frontend-container/src/pages/landing/Landing.jsx
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
const Analysis = lazy(() => import("./Analysis/Analysis"));
const Statistics = lazy(() => import("./Statistics/Statistics"));
const News = lazy(() => import("./News/News"));
const PredictionsAccuracy = lazy(() => import("./ai/PredictionsAccuracy"));
const Community = lazy(() => import("./Community/Community"));

const Landing = () => {
  const [showInteractive, setShowInteractive] = useState(false);

  useEffect(() => {
    if (showInteractive) {
      const script = document.createElement("script");
      script.src = "path/to/interactive/football/script.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showInteractive]);

  return (
    <React.Fragment>
      <Navigation />
      <Intro handleDonateClick={() => setShowInteractive(!showInteractive)} />

      <Suspense fallback={<div>Loading...</div>}>
        <section className="bg-light py-5" id="team-selector">
          <CombinedComponent />
        </section>

        <section className="py-5" id="analysis">
          <Container>
            <Row>
              <Col lg={8}>
                <PredictionsAccuracy />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="bg-light py-5" id="statistics">
          <Container>
            <Row>
              <Statistics />
            </Row>
          </Container>
        </section>

        <section className="py-5" id="news">
          <Container>
            <Row>
              <News />
            </Row>
          </Container>
        </section>

        <section className="bg-light py-5" id="community">
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

      <section className="py-5">
        <Integrations />
      </section>

      <section className="bg-light py-5" id="about">
        <About />
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default Landing;
