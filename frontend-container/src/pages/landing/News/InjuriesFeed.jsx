// src/pages/landing/News/InjuriesFeed.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { TEAMS } from "../../../constants";
const INJURIES_API_URL =
  "/api/everything?q=NFL%20injury&apiKey=b82732bd703f495a8c9f7ee9a325184a"; // Proxy URL with API key

const InjuriesFeed = () => {
  const [injuries, setInjuries] = useState([]);
  const [filteredInjuries, setFilteredInjuries] = useState([]);
  const [filter, setFilter] = useState("7days");

  useEffect(() => {
    const fetchInjuries = async () => {
      try {
        const response = await axios.get(INJURIES_API_URL);
        if (response.headers["content-type"].includes("application/json")) {
          const articles = response.data.articles;
          setInjuries(articles);
          filterInjuries(articles, filter);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching injuries:", error);
      }
    };
    fetchInjuries();
  }, [filter]);

  const filterInjuries = (articles, filter) => {
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
    setFilteredInjuries(filtered);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterInjuries(injuries, event.target.value);
  };

  return (
    <Container className="injuries-feed py-5">
      <h2 className="text-center mb-4">Injury Updates</h2>
      <Form.Group className="mb-4 text-center">
        <Form.Label>Filter by time range:</Form.Label>
        <Form.Control
          as="select"
          value={filter}
          onChange={handleFilterChange}
          className="w-auto d-inline-block ml-2"
        >
          <option value="24hrs">Last 24 Hours</option>
          <option value="2days">Last 2 Days</option>
          <option value="7days">Last 7 Days</option>
          <option value="1month">Last 1 Month</option>
          <option value="2months">Last 2 Months</option>
        </Form.Control>
      </Form.Group>
      <Row>
        {filteredInjuries.length === 0 ? (
          <Col>
            <p className="text-center">
              No injury updates available at the moment.
            </p>
          </Col>
        ) : (
          filteredInjuries.slice(0, 9).map((article, index) => (
            <Col lg={4} key={index} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={article.urlToImage || "https://via.placeholder.com/150"}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>
                    {article.description?.slice(0, 100) + "..."}
                  </Card.Text>
                  <Card.Link href={article.url} target="_blank">
                    Read more
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default InjuriesFeed;