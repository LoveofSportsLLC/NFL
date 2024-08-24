import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CarouselComponent from '../../../components/CarouselComponent';
import FilterComponent from '../../../components/FilterComponent';
import { INJURIES_API_URL } from '../../../config';
import placeholderImage from '/logo.png';

const InjuriesFeed = () => {
  const [injuries, setInjuries] = useState([]);
  const [filteredInjuries, setFilteredInjuries] = useState([]);
  const [filter, setFilter] = useState('2months');
  const [team, setTeam] = useState('all');

  useEffect(() => {
    const fetchInjuries = async () => {
      try {
        const response = await axios.get(INJURIES_API_URL);
        if (response.headers['content-type'].includes('application/json')) {
          const articles = response.data.articles || []; // Safely handle undefined articles
          setInjuries(articles);
          filterInjuries(articles, filter, team);
        } else {
          console.log('Invalid response data:', response.data);
        }
      } catch (error) {
        console.log('Error fetching injuries:', error);
      }
    };
    fetchInjuries();
  }, [filter, team]);

  const filterInjuries = (articles = [], filter, team) => {
    if (!Array.isArray(articles) || articles.length === 0) {
      setFilteredInjuries([]); // Handle empty or undefined articles
      return;
    }
    const now = new Date();
    let filtered;
    switch (filter) {
      case '24hrs':
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60) <= 24;
        });
        break;
      case '2days':
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60) <= 48;
        });
        break;
      case '7days':
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 7;
        });
        break;
      case '1month':
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 30;
        });
        break;
      case '2months':
        filtered = articles.filter((article) => {
          const date = new Date(article.publishedAt);
          return (now - date) / (1000 * 60 * 60 * 24) <= 60;
        });
        break;
      default:
        filtered = articles;
    }

    if (team !== 'all') {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(team.toLowerCase()),
      );
    }
    setFilteredInjuries(filtered);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterInjuries(injuries, event.target.value, team);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
    filterInjuries(injuries, filter, event.target.value);
  };

  return (
    <Container className="injuries-feed py-5">
      <h2 className="text-center mb-4">Injury Updates</h2>
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
            Showing {Math.min(filteredInjuries.length, 3)} of {injuries.length}{' '}
            articles
          </span>
        </Col>
      </Row>
      {filteredInjuries.length > 0 ? (
        filteredInjuries.length <= 3 ? (
          <div className="d-flex justify-content-around">
            {filteredInjuries.map((item, idx) => (
              <Card className="h-100 m-2" style={{ width: '18rem' }} key={idx}>
                <Card.Img
                  variant="top"
                  src={item.urlToImage || placeholderImage}
                  loading="lazy"
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description?.slice(0, 100) + '...'}
                  </Card.Text>
                  <Card.Link href={item.url} target="_blank">
                    Read more
                  </Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <CarouselComponent items={filteredInjuries.slice(0, 3)} />
        )
      ) : (
        <p>No injury updates available.</p>
      )}
    </Container>
  );
};

export default InjuriesFeed;