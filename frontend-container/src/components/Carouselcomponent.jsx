import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { Carousel } from 'react-bootstrap';

const CarouselComponent = ({ items, getYoutubeVideoId }) => {
  return (
    <Carousel>
      {items.map((item, idx) => (
        <Carousel.Item key={idx}>
          {getYoutubeVideoId(item.url) ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(item.url)}`}
                allowFullScreen
                loading="lazy"
                title="Highlight Video"
              ></iframe>
            </div>
          ) : (
            <img
              className="d-block w-100"
              src={item.urlToImage || 'https://via.placeholder.com/150'}
              alt={item.title}
              loading="lazy"
            />
          )}
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

CarouselComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired, // Assuming each item has a 'url'
      urlToImage: PropTypes.string, // Optional image URL
      title: PropTypes.string.isRequired, // Title is required
      description: PropTypes.string, // Description is optional
    }),
  ).isRequired, // Validate that `items` is an array of objects with the specified shape
  getYoutubeVideoId: PropTypes.func.isRequired, // Ensure `getYoutubeVideoId` is a function
};

export default CarouselComponent;
