import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CarouselComponent from '../../../components/CarouselComponent';
import FilterComponent from '../../../components/FilterComponent';
import { LATEST_NEWS_API_URL } from '../../../config';
import placeholderImage from '/logo.png';
import logger from '../../../utils/logger.js';

const LatestHeadlines = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filter, setFilter] = useState('7days');
  const [team, setTeam] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(LATEST_NEWS_API_URL);
        if (response.headers['content-type'].includes('application/json')) {
          const articles = response.data.articles;
          setNews(articles);
          filterNews(articles, filter, team);
        } else {
          logger.debug('Invalid response data:', response.data);
        }
      } catch (error) {
        logger.debug('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [filter, team]);

  const filterNews = (articles, filter, team) => {
    const now = new Date();
    let filtered;
    switch (filter) {
      case '24hrs':
        filtered = articles.filter(
          (article) =>
            (now - new Date(article.publishedAt)) / (1000 * 60 * 60) <= 24,
        );
        break;
      case '2days':
        filtered = articles.filter(
          (article) =>
            (now - new Date(article.publishedAt)) / (1000 * 60 * 60) <= 48,
        );
        break;
      case '7days':
        filtered = articles.filter(
          (article) =>
            (now - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24) <= 7,
        );
        break;
      case '1month':
        filtered = articles.filter(
          (article) =>
            (now - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24) <= 30,
        );
        break;
      case '2months':
        filtered = articles.filter(
          (article) =>
            (now - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24) <= 60,
        );
        break;
      default:
        filtered = articles;
    }

    if (team !== 'all') {
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
      <Row className="mb-4">
        <Col md={8}>
          <FilterComponent
            filter={filter}
            team={team}
            onFilterChange={handleFilterChange}
            onTeamChange={handleTeamChange}
          />
        </Col>
        <Col md={4} className="text-end">
          <span>
            Showing {Math.min(filteredNews.length, 3)} of {news.length} articles
          </span>
        </Col>
      </Row>
      {filteredNews.length <= 3 ? (
        <div className="d-flex justify-content-around">
          {filteredNews.map((item, idx) => (
            <Card className="h-100 m-2" style={{ width: '18rem' }} key={idx}>
              <Card.Img
                variant="top"
                src={item.urlToImage || placeholderImage}
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description?.slice(0, 100) + '...'}</Card.Text>
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
        <CarouselComponent items={filteredNews.slice(0, 3)} />
      )}
    </Container>
  );
};

export default LatestHeadlines;
