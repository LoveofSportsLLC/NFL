// src/pages/landing/Statistics/Players/PlayersPreview.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import player1 from "/analysis/player1.webp";
import player2 from "/analysis/player2.webp";
import player3 from "/analysis/player3.webp";
import player4 from "/analysis/player4.webp";
import player5 from "/analysis/player5.webp";
import player6 from "/analysis/player6.webp";
import player7 from "/analysis/player7.webp";
import player8 from "/analysis/player8.webp";
import player9 from "/analysis/player9.jpg";
import player10 from "/analysis/player10.webp";
import player11 from "/analysis/player11.jpg";
import player12 from "/analysis/player12.webp";
import player13 from "/analysis/player13.png";
import player14 from "/analysis/player14.jpg";
import player15 from "/analysis/player15.webp";

const playerImages = [
  {
    src: player1,
    alt: "Fantasy Leaders",
    captionTitle: "Player",
    captionText: "Fantasy Leaders",
  },
  {
    src: player2,
    alt: "Player 2 Overview",
    captionTitle: "Player",
    captionText: "Fantasy Player Profile",
  },
  {
    src: player3,
    alt: "Player 3 Overview",
    captionTitle: "Player",
    captionText: "Fantasy Player Visuals",
  },
  {
    src: player4,
    alt: "Player 4 Overview",
    captionTitle: "Player",
    captionText: "Player Profile",
  },
  {
    src: player5,
    alt: "Player 5 Overview",
    captionTitle: "Player",
    captionText: "Player Overview",
  },
  {
    src: player6,
    alt: "Player 6 Overview",
    captionTitle: "Player",
    captionText: "Player Statistics",
  },
  {
    src: player7,
    alt: "Player 7 Overview",
    captionTitle: "Player",
    captionText: "Player Performance",
  },
  {
    src: player8,
    alt: "Player 8 Overview",
    captionTitle: "Player",
    captionText: "Player Highlights",
  },
  {
    src: player9,
    alt: "Player 9 Overview",
    captionTitle: "Player",
    captionText: "Player Analysis",
  },
  {
    src: player10,
    alt: "Player 10 Overview",
    captionTitle: "Player",
    captionText: "Player Insights",
  },
  {
    src: player11,
    alt: "Player 11 Overview",
    captionTitle: "Player",
    captionText: "Player Review",
  },
  {
    src: player12,
    alt: "Player 12 Overview",
    captionTitle: "Player",
    captionText: "Player Recap",
  },
  {
    src: player13,
    alt: "Player 13 Overview",
    captionTitle: "Player",
    captionText: "Player Summary",
  },
  {
    src: player14,
    alt: "Player 14 Overview",
    captionTitle: "Player",
    captionText: "Player Breakdown",
  },
  {
    src: player15,
    alt: "Player 15 Overview",
    captionTitle: "Player",
    captionText: "Player Snapshot",
  },
];

const PlayersPreview = () => {
  return (
    <Carousel>
      {playerImages.map((player, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-lazy"
            src={player.src}
            alt={player.alt}
            loading="lazy"
          />
          <Carousel.Caption>
            <h5>{player.captionTitle}</h5>
            <p>{player.captionText}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PlayersPreview;
