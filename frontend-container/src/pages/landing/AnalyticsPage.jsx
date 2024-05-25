// src/pages/landing/AnalyticsPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import DonateModal from "../auth/DonateModal";
import AboutUsModal from "./AboutUs";
import SupportModal from "./SupportModal";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Overview from "./Overview";
import MatchAnalysis from "./MatchAnalysis";
import PlayerPerformance from "./PlayerPerformance";
import PredictionAccuracy from "./PredictionAccuracy";
import UserEngagement from "./UserEngagement";

const AnalyticsPage = () => {
  const mockOverviewData = {
    totalMatches: 5000,
    totalPlayers: 1200,
    activeUsers: 15000,
  };

  const mockMatchAnalysis = [
    {
      title: "Match 1 Analysis",
      details: "Detailed analysis of match 1.",
      image: "/analysis/match1.webp",
    },
    {
      title: "Match 2 Analysis",
      details: "Detailed analysis of match 2.",
      image: "/analysis/match2.webp",
    },
    {
      title: "Match 3 Analysis",
      details: "Detailed analysis of match 3.",
      image: "/analysis/match3.webp",
    },
  ];

  const mockPlayerPerformance = [
    {
      name: "Player 1",
      performanceDetails: "Details about player 1 performance.",
      image: "/analysis/player1.webp",
    },
    {
      name: "Player 2",
      performanceDetails: "Details about player 2 performance.",
      image: "/analysis/player2.webp",
    },
    {
      name: "Player 3",
      performanceDetails: "Details about player 3 performance.",
      image: "/analysis/player3.webp",
    },
  ];

  const mockPredictionAccuracy = {
    explainedVariance: 0.97929,
    meanAbsoluteError: 1.0984,
    r2Score: 0.97929,
    spearmanCorrelation: 0.98476,
  };

  const mockUserEngagement = {
    activeUsers: 15000,
    frequencyOfUsage: "Daily",
    timeSpent: "2 hours per session",
    image: "/analysis/engagement.webp",
  };

  const [overviewData] = useState(mockOverviewData);
  const [matchAnalysis] = useState(mockMatchAnalysis);
  const [playerPerformance] = useState(mockPlayerPerformance);
  const [predictionAccuracy] = useState(mockPredictionAccuracy);
  const [userEngagement] = useState(mockUserEngagement);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const handleDonateClick = () => setShowDonateModal(true);
  const handleCloseDonateModal = () => setShowDonateModal(false);
  const handleAboutUsClick = () => setShowAboutUsModal(true);
  const handleCloseAboutUsModal = () => setShowAboutUsModal(false);
  const handleSupportClick = () => setShowSupportModal(true);
  const handleCloseSupportModal = () => setShowSupportModal(false);

  return (
    <React.Fragment>
      <Navigation handleDonateClick={handleDonateClick} />
      <DonateModal show={showDonateModal} onHide={handleCloseDonateModal} />
      <AboutUsModal show={showAboutUsModal} onHide={handleCloseAboutUsModal} />
      <SupportModal show={showSupportModal} onHide={handleCloseSupportModal} />

      <Container fluid className="mt-5 pt-5">
        <section className="text-center mb-5">
          <Container>
            <Row>
              <Col>
                <h1 className="display-4 font-weight-bold">
                  Love of Football Analytics Dashboard
                </h1>
                <p className="lead">
                  Unlock powerful insights with our advanced analytics platform.
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={8}>
                <img
                  src="/analysis/dashboard_preview.webp"
                  alt="Dashboard Preview"
                  className="img-fluid rounded shadow mb-5"
                />
              </Col>
            </Row>
          </Container>
        </section>

        <Overview
          overviewData={overviewData}
          userEngagement={mockUserEngagement}
        />
        <MatchAnalysis matchAnalysis={matchAnalysis} />
        <PlayerPerformance playerPerformance={playerPerformance} />
        <PredictionAccuracy predictionAccuracy={predictionAccuracy} />
        <UserEngagement userEngagement={mockUserEngagement} />
      </Container>

      <Footer />
    </React.Fragment>
  );
};

export default AnalyticsPage;
