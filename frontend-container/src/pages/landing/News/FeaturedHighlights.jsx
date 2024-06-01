// src/pages/landing/News/FeaturedHighlights.jsx
import React, { useState, useEffect, Card } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import CarouselComponent from "../../../components/CarouselComponent";
import { axiosRetry } from "../../../utils/retry";

const HIGHLIGHTS_API_URL =
  "/api/everything?q=NFL%20highlight&apiKey=b82732bd703f495a8c9f7ee9a325184a"; // Replace with your actual API key

const FeaturedHighlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [filteredHighlights, setFilteredHighlights] = useState([]);
  const [filter, setFilter] = useState("7days");
  const [team, setTeam] = useState("all");

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await axiosRetry(axios, {
          url: HIGHLIGHTS_API_URL,
          method: "get",
        });
        if (response.headers["content-type"].includes("application/json")) {
          const articles = response.data.articles;
          setHighlights(articles);
          filterHighlights(articles, filter, team);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
      }
    };
    fetchHighlights();
  }, [filter, team]);

  const filterHighlights = (articles, filter, team) => {
    const now = new Date();
    let filtered;
    switch (filter) {
      case "24hrs":
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60) <= 24;
        });
        break;
      case "2days":
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60) <= 48;
        });
        break;
      case "7days":
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 7;
        });
        break;
      case "1month":
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 30;
        });
        break;
      case "2months":
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 60;
        });
        break;
      default:
        filtered = articles;
    }

    if (team !== "all") {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(team.toLowerCase()),
      );
    }
    setFilteredHighlights(filtered);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterHighlights(highlights, event.target.value, team);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
    filterHighlights(highlights, filter, event.target.value);
  };

  const getYoutubeVideoId = (url) => {
    const regExp =
      /^.*((m\.)?youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[3].length === 11 ? match[3] : null;
  };

  return (
    <Container className="featured-highlights py-5">
      <h2 className="text-center mb-4">Featured Highlights</h2>
      <FilterComponent
        filter={filter}
        team={team}
        onFilterChange={handleFilterChange}
        onTeamChange={handleTeamChange}
      />
      {filteredHighlights.length <= 3 ? (
        <div className="d-flex justify-content-around">
          {filteredHighlights.map((item, idx) => (
            <Card className="h-100 m-2" style={{ width: "18rem" }} key={idx}>
              {getYoutubeVideoId(item.url) ? (
                <div className="ratio ratio-16x9 mb-3">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(item.url)}`}
                    allowFullScreen
                    loading="lazy"
                    title="Highlight Video"
                  ></iframe>
                </div>
              ) : (
                <Card.Img
                  variant="top"
                  src={item.urlToImage || "https://via.placeholder.com/150"}
                />
              )}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description?.slice(0, 100) + "..."}</Card.Text>
                <Card.Text>
                  <small>{new Date(item.publishedAt).toLocaleString()}</small>
                </Card.Text>
                <Card.Link href={item.url} target="_blank">
                  Watch video
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <CarouselComponent
          items={filteredHighlights}
          getYoutubeVideoId={getYoutubeVideoId}
        />
      )}
    </Container>
  );
};

export default FeaturedHighlights;
