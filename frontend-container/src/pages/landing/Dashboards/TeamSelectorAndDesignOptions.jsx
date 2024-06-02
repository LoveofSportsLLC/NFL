//src/pages/landing/Dashboards/TeamSelectorAndDesignOptions.jsx
import React, { useState } from "react";
import { Container, Row, Col, Carousel, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { TEAMS } from "../../../constants";
import { Link } from "react-router-dom";
import Packers1 from "/scheme/packers1.webp";
import Packers2 from "/scheme/packers2.webp";
import Packers3 from "/scheme/packers3.webp";
import Bears1 from "/scheme/bears1.webp";
import Bears2 from "/scheme/bears2.webp";
import Bears3 from "/scheme/bears3.webp";
import Lions1 from "/scheme/lions1.webp";
import Lions2 from "/scheme/lions2.webp";
import Lions3 from "/scheme/lions3.webp";
import Vikings1 from "/scheme/vikings1.webp";
import Vikings2 from "/scheme/vikings2.webp";
import Vikings3 from "/scheme/vikings3.webp";
import Cowboys1 from "/scheme/cowboys1.webp";
import Cowboys2 from "/scheme/cowboys2.webp";
import Cowboys3 from "/scheme/cowboys3.webp";
import Giants1 from "/scheme/giants1.webp";
import Giants2 from "/scheme/giants2.webp";
import Giants3 from "/scheme/giants3.webp";
import Eagles1 from "/scheme/eagles1.webp";
import Eagles2 from "/scheme/eagles2.webp";
import Eagles3 from "/scheme/eagles3.webp";
import Commanders1 from "/scheme/commanders1.webp";
import Commanders2 from "/scheme/commanders2.webp";
import Commanders3 from "/scheme/commanders3.webp";
import Buccaneers1 from "/scheme/buccaneers1.webp";
import Buccaneers2 from "/scheme/buccaneers2.webp";
import Buccaneers3 from "/scheme/buccaneers3.webp";
import Saints1 from "/scheme/saints1.webp";
import Saints2 from "/scheme/saints2.webp";
import Saints3 from "/scheme/saints3.webp";
import Panthers1 from "/scheme/panthers1.webp";
import Panthers2 from "/scheme/panthers2.webp";
import Panthers3 from "/scheme/panthers3.webp";
import Falcons1 from "/scheme/falcons1.webp";
import Falcons2 from "/scheme/falcons2.webp";
import Falcons3 from "/scheme/falcons3.webp";
import Seahawks1 from "/scheme/seahawks1.webp";
import Seahawks2 from "/scheme/seahawks2.webp";
import Seahawks3 from "/scheme/seahawks3.webp";
import Niners1 from "/scheme/niners1.webp";
import Niners2 from "/scheme/niners2.webp";
import Niners3 from "/scheme/niners3.webp";
import Rams1 from "/scheme/rams1.webp";
import Rams2 from "/scheme/rams2.webp";
import Rams3 from "/scheme/rams3.webp";
import Cardinals1 from "/scheme/cardinals1.webp";
import Cardinals2 from "/scheme/cardinals2.webp";
import Cardinals3 from "/scheme/cardinals3.webp";
import Bengals1 from "/scheme/bengals1.webp";
import Bengals2 from "/scheme/bengals2.webp";
import Bengals3 from "/scheme/bengals3.webp";
import Steelers1 from "/scheme/steelers1.webp";
import Steelers2 from "/scheme/steelers2.webp";
import Steelers3 from "/scheme/steelers3.webp";
import Ravens1 from "/scheme/ravens1.webp";
import Ravens2 from "/scheme/ravens2.webp";
import Ravens3 from "/scheme/ravens3.webp";
import Browns1 from "/scheme/browns1.webp";
import Browns2 from "/scheme/browns2.webp";
import Browns3 from "/scheme/browns3.webp";
import Bills1 from "/scheme/bills1.webp";
import Bills2 from "/scheme/bills2.webp";
import Bills3 from "/scheme/bills3.webp";
import Patriots1 from "/scheme/patriots1.webp";
import Patriots2 from "/scheme/patriots2.webp";
import Patriots3 from "/scheme/patriots3.webp";
import Dolphins1 from "/scheme/dolphins1.webp";
import Dolphins2 from "/scheme/dolphins2.webp";
import Dolphins3 from "/scheme/dolphins3.webp";
import Jets1 from "/scheme/jets1.webp";
import Jets2 from "/scheme/jets2.webp";
import Jets3 from "/scheme/jets3.webp";
import Chiefs1 from "/scheme/chiefs1.webp";
import Chiefs2 from "/scheme/chiefs2.webp";
import Chiefs3 from "/scheme/chiefs3.webp";
import Raiders1 from "/scheme/raiders1.webp";
import Raiders2 from "/scheme/raiders2.webp";
import Raiders3 from "/scheme/raiders3.webp";
import Chargers1 from "/scheme/chargers1.webp";
import Chargers2 from "/scheme/chargers2.webp";
import Chargers3 from "/scheme/chargers3.webp";
import Broncos1 from "/scheme/broncos1.webp";
import Broncos2 from "/scheme/broncos2.webp";
import Broncos3 from "/scheme/broncos3.webp";
import Colts1 from "/scheme/colts1.webp";
import Colts2 from "/scheme/colts2.webp";
import Colts3 from "/scheme/colts3.webp";
import Titans1 from "/scheme/titans1.webp";
import Titans2 from "/scheme/titans2.webp";
import Titans3 from "/scheme/titans3.webp";
import Jaguars1 from "/scheme/jaguars1.webp";
import Jaguars2 from "/scheme/jaguars2.webp";
import Jaguars3 from "/scheme/jaguars3.webp";
import Texans1 from "/scheme/texans1.webp";
import Texans2 from "/scheme/texans2.webp";
import Texans3 from "/scheme/texans3.webp";

// Add an array for team images to easily access them
const teamImages = {
  packers: [Packers1, Packers2, Packers3],
  bears: [Bears1, Bears2, Bears3],
  lions: [Lions1, Lions2, Lions3],
  vikings: [Vikings1, Vikings2, Vikings3],
  cowboys: [Cowboys1, Cowboys2, Cowboys3],
  giants: [Giants1, Giants2, Giants3],
  eagles: [Eagles1, Eagles2, Eagles3],
  commanders: [Commanders1, Commanders2, Commanders3],
  buccaneers: [Buccaneers1, Buccaneers2, Buccaneers3],
  saints: [Saints1, Saints2, Saints3],
  panthers: [Panthers1, Panthers2, Panthers3],
  falcons: [Falcons1, Falcons2, Falcons3],
  seahawks: [Seahawks1, Seahawks2, Seahawks3],
  niners: [Niners1, Niners2, Niners3],
  rams: [Rams1, Rams2, Rams3],
  cardinals: [Cardinals1, Cardinals2, Cardinals3],
  bengals: [Bengals1, Bengals2, Bengals3],
  steelers: [Steelers1, Steelers2, Steelers3],
  ravens: [Ravens1, Ravens2, Ravens3],
  browns: [Browns1, Browns2, Browns3],
  bills: [Bills1, Bills2, Bills3],
  patriots: [Patriots1, Patriots2, Patriots3],
  dolphins: [Dolphins1, Dolphins2, Dolphins3],
  jets: [Jets1, Jets2, Jets3],
  chiefs: [Chiefs1, Chiefs2, Chiefs3],
  raiders: [Raiders1, Raiders2, Raiders3],
  chargers: [Chargers1, Chargers2, Chargers3],
  broncos: [Broncos1, Broncos2, Broncos3],
  colts: [Colts1, Colts2, Colts3],
  titans: [Titans1, Titans2, Titans3],
  jaguars: [Jaguars1, Jaguars2, Jaguars3],
  texans: [Texans1, Texans2, Texans3],
};

const TeamSelectorAndDesignOptions = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleImageError = (e, teamName, type) => {
    e.target.onerror = null; // Prevent infinite fallback loop
    console.error(`Failed to load image for ${teamName} (${type})`);
    e.target.src = "/src/assets/img/Logo.png"; // Fallback image path
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={12}>
          <h2 className="text-center">Select Your Favorite NFL Team</h2>
          <Carousel
            activeIndex={activeIndex}
            onSelect={handleSelect}
            interval={null}
          >
            {Object.keys(TEAMS).map((teamName) => (
              <Carousel.Item key={teamName}>
                <Row className="align-items-center">
                  <Col md={6}>
                    <img
                      className="d-block w-100 img-lazy"
                      src={`/teamlogos/${teamName.toLowerCase()}.png`}
                      alt={`${teamName} logo`}
                      onError={(e) => handleImageError(e, teamName, "logo")}
                    />
                  </Col>
                  <Col md={6}>
                    <img
                      className="d-block w-100 img-lazy"
                      src={`/fans/${teamName.toLowerCase()}fans.png`}
                      alt={`${teamName} fans`}
                      onError={(e) => handleImageError(e, teamName, "fans")}
                    />
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="text-center mt-5">
        <h3 className="mb-4">Choose Your Color Scheme & Layout</h3>
        <p className="text-muted fs-lg mb-4">
          Customize the look and feel of your NFL statistics platform with
          various color schemes and layouts. You have the flexibility to create
          a unique design that suits your preferences.
        </p>
      </Row>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Carousel
            activeIndex={activeIndex}
            onSelect={handleSelect}
            interval={null}
          >
            {Object.keys(TEAMS).map((teamName) => (
              <Carousel.Item key={teamName}>
                <Row className="align-items-center">
                  {teamImages[teamName.toLowerCase()] &&
                    teamImages[teamName.toLowerCase()].map((src, idx) => (
                      <Col md={4} key={idx} className="mb-3 text-center">
                        <Link
                          className="d-block mb-3 mx-1"
                          target="_blank"
                          rel="noreferrer"
                          to={`/design/${teamName.toLowerCase()}`}
                        >
                          <div className="landing-feature">
                            <FontAwesomeIcon icon={faPalette} />
                          </div>
                          <img
                            src={src}
                            className="img-fluid rounded-lg landing-img img-lazy"
                            alt={`${teamName} Color Scheme ${idx + 1}`}
                            loading="lazy"
                            onError={(e) =>
                              handleImageError(e, teamName, "colorScheme")
                            }
                          />
                        </Link>
                        <h4>
                          {teamName} Theme {idx + 1}
                          <sup>
                            <Badge as="small" bg="primary">
                              {teamName}
                            </Badge>
                          </sup>
                        </h4>
                      </Col>
                    ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamSelectorAndDesignOptions;
