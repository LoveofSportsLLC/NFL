// frontend-container/src/pages/landing/News/FeaturedHighlights.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import FilterComponent from "../../../components/FilterComponent";
import CarouselComponent from "../../../components/CarouselComponent";
import { HIGHLIGHTS_API_URL } from "../../../config";
import { axiosRetry } from "../../../utils/retry";
import placeholderImage from "/src/assets/img/logo.png";
import { log } from "../../../utils/logs";

const FeaturedHighlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [filteredHighlights, setFilteredHighlights] = useState([]);
  const [filter, setFilter] = useState("7days");
  const [team, setTeam] = useState("all");

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await axiosRetry(axios, {
          method: "get",
          url: HIGHLIGHTS_API_URL,
        });
        if (response.headers["content-type"].includes("application/json")) {
          const articles = response.data.articles.map((article) => ({
            ...article,
            urlToImage: article.urlToImage || placeholderImage,
            url: article.url || "",
            title: article.title || "No Title",
            description: article.description || "No Description",
            publishedAt: article.publishedAt || new Date().toISOString(),
          }));
          setHighlights(articles);
          filterHighlights(articles, filter, team);
        } else {
          log("Invalid response data:", response.data);
        }
      } catch (error) {
        log("Error fetching highlights:", error);
      }
    };
    fetchHighlights();
  }, [filter, team]);

  const filterHighlights = (videos, filter, team) => {
    const now = new Date();
    let filtered;
    switch (filter) {
      case "24hrs":
        filtered = videos.filter((video) => {
          const date = new Date(video.publishedAt);
          return (now - date) / (1000 * 60 * 60) <= 24;
        });
        break;
      case "2days":
        filtered = videos.filter((video) => {
          const date = new Date(video.publishedAt);
          return (now - date) / (1000 * 60 * 60) <= 48;
        });
        break;
      case "7days":
        filtered = videos.filter((video) => {
          const date = new Date(video.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 7;
        });
        break;
      case "1month":
        filtered = videos.filter((video) => {
          const date = new Date(video.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 30;
        });
        break;
      case "2months":
        filtered = videos.filter((video) => {
          const date = new Date(video.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 60;
        });
        break;
      default:
        filtered = videos;
    }

    if (team !== "all") {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(team.toLowerCase()),
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
      <Row className="mb-4">
        <Col md={8}>
          <FilterComponent
            filter={filter}
            team={team}
            onFilterChange={handleFilterChange}
            onTeamChange={handleTeamChange}
            className="w-auto d-inline-block ml-2"
          />
        </Col>
        <Col md={4} className="text-end">
          <span>
            Showing {Math.min(filteredHighlights.length, 3)} of{" "}
            {highlights.length} videos
          </span>
        </Col>
      </Row>
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
                <Card.Img variant="top" src={item.urlToImage} loading="lazy" />
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
