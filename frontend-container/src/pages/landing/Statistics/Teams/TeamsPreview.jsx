// src/pages/landing/Statistics/Teams/TeamsPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import team1 from "/analysis/team1.webp";
import team2 from "/analysis/team2.webp";
import team3 from "/analysis/team3.webp";
import team4 from "/analysis/team4.png";
import team5 from "/analysis/team5.png";
import team6 from "/analysis/team6.webp";
import team7 from "/analysis/team7.webp";

const teamImages = [
  {
    src: team1,
    alt: "Team 1 Overview",
    captionTitle: "Team 1",
    captionText: "Overview of team performance.",
  },
  {
    src: team2,
    alt: "Team 2 Overview",
    captionTitle: "Team 2",
    captionText: "Overview of team performance.",
  },
  {
    src: team3,
    alt: "Team 3 Overview",
    captionTitle: "Team 3",
    captionText: "Overview of team performance.",
  },
  {
    src: team4,
    alt: "Team 4 Overview",
    captionTitle: "Team 4",
    captionText: "Overview of team performance.",
  },
  {
    src: team5,
    alt: "Team 5 Overview",
    captionTitle: "Team 5",
    captionText: "Overview of team performance.",
  },
  {
    src: team6,
    alt: "Team 6 Overview",
    captionTitle: "Team 6",
    captionText: "Overview of team performance.",
  },
  {
    src: team7,
    alt: "Team 7 Overview",
    captionTitle: "Team 7",
    captionText: "Overview of team performance.",
  },
];

const TeamsPreview = () => {
  return (
    <Carousel>
      {teamImages.map((team, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={team.src}
            alt={team.alt}
            loading="lazy"
          />
          <Carousel.Caption>
            <h5>{team.captionTitle}</h5>
            <p>{team.captionText}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TeamsPreview;
