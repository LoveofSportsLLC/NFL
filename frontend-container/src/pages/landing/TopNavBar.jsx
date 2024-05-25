// src/pages/landing/TopNavBar.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/img/logo.svg";
import AboutUsModal from "./AboutUs";
import SupportModal from "./SupportModal";
import DonateModal from "../auth/DonateModal";
import "./TopNavBar.css"; // Add appropriate CSS file for styling

const TopNavBar = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleDonateClick = () => setShowDonateModal(true);
  const handleCloseDonateModal = () => setShowDonateModal(false);
  const handleAboutUsClick = () => setShowAboutUsModal(true);
  const handleCloseAboutUsModal = () => setShowAboutUsModal(false);
  const handleSupportClick = () => setShowSupportModal(true);
  const handleCloseSupportModal = () => setShowSupportModal(false);
  const { loginWithRedirect } = useAuth0();

  const sections = [
    "home",
    "dashboard",
    "teams",
    "players",
    "games",
    "standings",
    "stats",
    "news",
    "fantasy",
    "analysis",
    "model-insights",
    "about",
    "search",
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    let currentSection = "home";
    sections.forEach((section) => {
      const element = document.getElementById(section);
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        currentSection = section;
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" className="top-navbar fixed-top" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="LoveofFootball.io Logo"
          />
          LoveofFootball.io
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {sections.map((section) => (
              <Nav.Item key={section} className="nav-item">
                <Nav.Link
                  onClick={() => scrollToSection(section)}
                  className={activeSection === section ? "active" : ""}
                >
                  {section.charAt(0).toUpperCase() +
                    section.slice(1).replace("-", " ")}
                </Nav.Link>
              </Nav.Item>
            ))}
            {/* About Us button */}
            <Nav.Item className="nav-item">
              <Nav.Link onClick={handleAboutUsClick}>About Us</Nav.Link>
            </Nav.Item>
            {/* Support button */}
            <Nav.Item className="nav-item">
              <Nav.Link onClick={handleSupportClick}>Support</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="auth-buttons ms-3">
            {/* Trigger the Sign In modal */}
            <Button
              onClick={loginWithRedirect}
              variant="outline-light"
              className="me-2"
            >
              Login
            </Button>
            {/* Trigger the Get Started (Sign Up) modal */}
            <Button onClick={handleDonateClick} variant="success">
              Donate
            </Button>
            {/* About Us Modal */}
            <AboutUsModal
              show={showAboutUsModal}
              onHide={handleCloseAboutUsModal}
            />
            {/* Support Modal */}
            <SupportModal
              show={showSupportModal}
              onHide={handleCloseSupportModal}
            />
          </div>
        </Navbar.Collapse>
      </Container>
      {/* Render the Sign In and Sign Up modals */}
      <DonateModal show={showDonateModal} onHide={handleCloseDonateModal} />
    </Navbar>
  );
};

export default TopNavBar;
