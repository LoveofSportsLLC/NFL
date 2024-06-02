import React from "react";
import { Carousel } from "react-bootstrap";

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
              src={item.urlToImage || "https://via.placeholder.com/150"}
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

export default CarouselComponent;
