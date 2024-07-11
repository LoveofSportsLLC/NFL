import React, { useState, Suspense, lazy } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation/Navigation';
import Intro from './Intro/Intro';
import Integrations from './BottomPage/Integrations';
import Footer from './BottomPage/Footer';
import About from './Aboutus/About';
import DonateModal from '../auth/DonateModal';

// Lazy-loaded components
const CombinedComponent = lazy(() => import('./Dashboards/CombinedComponent'));
const Analysis = lazy(() => import('./Analysis/Analysis'));
const Statistics = lazy(() => import('./Statistics/Statistics'));
const News = lazy(() => import('./News/News'));
const PredictionsAccuracy = lazy(() => import('./ai/PredictionsAccuracy'));
const CommunityForum = lazy(() => import('./Community/CommunityForum'));

const Landing = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  const handleDonateClick = () => {
    setShowDonateModal(true);
  };

  const handleCloseDonateModal = () => {
    setShowDonateModal(false);
  };

  return (
    <React.Fragment>
      <Navigation />
      <Intro handleDonateClick={handleDonateClick} />
      <DonateModal show={showDonateModal} onHide={handleCloseDonateModal} />

      <Suspense fallback={<div>Loading...</div>}>
        <section className="bg-light py-5" id="team-selector">
          <CombinedComponent />
        </section>
        <section className="bg-light py-5" id="ai-overview">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
                  AI Overview
                </span>
                <h3 className="h1 mb-5">AI Model Insights & Predictions</h3>

                <PredictionsAccuracy />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-5" id="analysis">
          <Container>
            <Row>
              <Analysis />
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

        <section className="py-5" id="community">
          <CommunityForum />
        </section>
      </Suspense>

      <section className="bg-light py-5">
        <Integrations />
      </section>

      <section className="py-5" id="about">
        <About />
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default Landing;
