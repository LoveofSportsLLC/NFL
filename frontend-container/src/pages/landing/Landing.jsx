import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Intro from "./Intro";
import TeamSelectorAndDesignOptions from "./TeamSelectorAndDesignOptions";
import Dashboards from "./Dashboards";
import Analysis from "./Analysis";
import Statistics from "./Statistics/Statistics";
import Integrations from "./Integrations";
import Testimonials from "./Testimonials";
import Faq from "./Faq";

const Landing = () => {
  // State to manage interactive football (Optional)
  const [showInteractive, setShowInteractive] = useState(false);

  // Fetching script for interactive football (Optional)
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
      {/* Intro Section */}
      <Intro handleDonateClick={() => setShowInteractive(!showInteractive)} />

      {/* Company Vision */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md="4" className="text-center">
              <h3>Real-Time Statistics</h3>
              <p>Stay up-to-date with real-time stats.</p>
            </Col>
            <Col md="4" className="text-center">
              <h3>Detailed Analysis</h3>
              <p>Analyze every aspect of the game.</p>
            </Col>
            <Col md="4" className="text-center">
              <h3>Customizable Dashboards</h3>
              <p>Create your own dashboard views.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Selector and Design Options */}
      <section className="bg-light py-5">
        <TeamSelectorAndDesignOptions />
      </section>

      {/* Technology */}
      {/* <section className="py-5">
        <Container>
          <Row>
            <Col md="6">
              <h3>Advanced Technology</h3>
              <p>
                We use state-of-the-art technology to deliver precise and
                insightful football analytics.
              </p>
            </Col>
            <Col md="6">
              <img
                src="/path/to/technology/image.jpg"
                alt="Technology"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Analysis */}
      <section className="bg-light py-5">
        <Analysis />
      </section>

      {/* Dashboards */}
      <section className="py-5">
        <Dashboards />
      </section>

      {/* Statistics */}
      <section className="py-5">
        <Statistics />
      </section>

      {/* Integrations */}
      <section className="py-5">
        <Integrations />
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <Testimonials />
      </section>

      {/* FAQ */}
      <section className="py-5">
        <Faq />
      </section>

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Landing;