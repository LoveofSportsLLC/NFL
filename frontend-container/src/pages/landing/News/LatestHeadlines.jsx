// src/pages/landing/News/LatestHeadlines.jsx
import React, { useState, useEffect, Card } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import CarouselComponent from "../../../components/CarouselComponent";
import { axiosRetry } from "../../../utils/retry";

const LATEST_NEWS_API_URL =
  "/api/everything?q=NFL&apiKey=b82732bd703f495a8c9f7ee9a325184a"; // Replace with your actual API key

const LatestHeadlines = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filter, setFilter] = useState("7days");
  const [team, setTeam] = useState("all");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosRetry(axios, {
          url: LATEST_NEWS_API_URL,
          method: "get",
        });
        if (response.headers["content-type"].includes("application/json")) {
          const articles = response.data.articles;
          setNews(articles);
          filterNews(articles, filter, team);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [filter, team]);

  const filterNews = (articles, filter, team) => {
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
    setFilteredNews(filtered);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterNews(news, event.target.value, team);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
    filterNews(news, filter, event.target.value);
  };

  return (
    <Container className="latest-headlines py-5">
      <h2 className="text-center mb-4">Latest Headlines</h2>
      <FilterComponent
        filter={filter}
        team={team}
        onFilterChange={handleFilterChange}
        onTeamChange={handleTeamChange}
      />
      {filteredNews.length <= 3 ? (
        <div className="d-flex justify-content-around">
          {filteredNews.map((item, idx) => (
            <Card className="h-100 m-2" style={{ width: "18rem" }} key={idx}>
              <Card.Img
                variant="top"
                src={item.urlToImage || "https://via.placeholder.com/150"}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description?.slice(0, 100) + "..."}</Card.Text>
                <Card.Text>
                  <small>{new Date(item.publishedAt).toLocaleString()}</small>
                </Card.Text>
                <Card.Link href={item.url} target="_blank">
                  Read more
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <CarouselComponent items={filteredNews} />
      )}
    </Container>
  );
};

export default LatestHeadlines;
