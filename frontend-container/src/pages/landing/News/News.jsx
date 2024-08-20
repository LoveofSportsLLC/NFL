// src/pages/landing/News/News.jsx
import React from 'react';
import { Container, Card, Col } from 'react-bootstrap';
import LatestHeadlines from './LatestHeadlines';
import InjuriesFeed from './InjuriesFeed';
import FeaturedHighlights from './FeaturedHighlights'; // Import the new component

const News = () => {
  return (
    <section className="py-5" id="news-section">
      <Container>
        <Card
          className="p-4"
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '10px',
          }}
        >
          <Col md="12" className="mx-auto text-center">
            <span className="text-uppercase text-primary text-sm fw-medium mb-1 d-block">
              News
            </span>
            <h2 className="h1 mb-5">Everything NFL</h2>
          </Col>
          <LatestHeadlines />
          <InjuriesFeed />
          <FeaturedHighlights /> {/* Include Featured Highlights */}
        </Card>
      </Container>
    </section>
  );
};

export default News;
