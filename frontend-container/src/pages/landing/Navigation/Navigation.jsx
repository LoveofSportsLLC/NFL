// src/pages/landing/Navigation.jsx
import React, { useState } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../../assets/img/logo.svg";
import AboutUsModal from "../Aboutus/AboutUs";
import SupportModal from "../Aboutus/SupportModal";
import DonateModal from "../../auth/DonateModal";

const Navigation = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleDonateClick = () => setShowDonateModal(true);
  const handleCloseDonateModal = () => setShowDonateModal(false);
  const handleAboutUsClick = () => setShowAboutUsModal(true);
  const handleCloseAboutUsModal = () => setShowAboutUsModal(false);
  const handleSupportClick = () => setShowSupportModal(true);
  const handleCloseSupportModal = () => setShowSupportModal(false);
  const { loginWithRedirect } = useAuth0();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const analysisSections = [
    "performance-Metrics",
    "team-Analysis",
    "game-Insights",
    "fantasy-Football",
  ];

  const statisticsSections = [
    "Teams",
    "Players",
    "Games",
    "Standings",
    "Coaches",
  ];
  const aiOverviewSections = [
    "Model-Overview",
    "Model-Insights",
    "Predictions",
    "Predictions-Accuracy",
  ];

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="sticky-top py-3"
      style={{
        width: "100%",
      }}
    >
      <Navbar.Brand href="/" className="d-flex align-items-center">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="LoveofFootball.io Logo"
        />
        <span className="ms-2">LoveofFootball.io</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link onClick={() => scrollToSection("dashboards")}>
            Dashboards
          </Nav.Link>
          <NavDropdown title="Analysis" id="analysis-nav-dropdown">
            {analysisSections.map((section) => (
              <NavDropdown.Item
                key={section}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() +
                  section.slice(1).replace("-", " ")}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <NavDropdown title="Statistics" id="statistics-nav-dropdown">
            {statisticsSections.map((section) => (
              <NavDropdown.Item
                key={section}
                onClick={() =>
                  scrollToSection(section.toLowerCase().replace(" ", "-"))
                }
              >
                {section}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <Nav.Link onClick={() => scrollToSection("news")}>News</Nav.Link>

          <NavDropdown title="AI Overview" id="ai-overview-nav-dropdown">
            {aiOverviewSections.map((section) => (
              <NavDropdown.Item
                key={section}
                onClick={() => scrollToSection(section)}
              >
                {section.replace("-", " ")}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <Nav.Link onClick={() => scrollToSection("community")}>
            Community
          </Nav.Link>

          <NavDropdown title="About Us" id="about-us-nav-dropdown">
            <NavDropdown.Item onClick={handleAboutUsClick}>
              About
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleSupportClick}>
              Support
            </NavDropdown.Item>
          </NavDropdown>

          <Button
            onClick={loginWithRedirect}
            variant="primary"
            className="ms-2"
          >
            Login
          </Button>
          <Button
            onClick={handleDonateClick}
            variant="success"
            className="ms-2"
          >
            Donate
          </Button>
        </Nav>
      </Navbar.Collapse>

      <AboutUsModal show={showAboutUsModal} onHide={handleCloseAboutUsModal} />
      <SupportModal show={showSupportModal} onHide={handleCloseSupportModal} />
      <DonateModal show={showDonateModal} onHide={handleCloseDonateModal} />
    </Navbar>
  );
};

export default Navigation;
