// src/components/CarouselComponent.jsx
import React from "react";
import { Carousel, Card } from "react-bootstrap";

const CarouselComponent = ({ items, getYoutubeVideoId }) => {
  const chunkItems = (arr, chunkSize) => {
    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunks = chunkItems(items, 3);

  return (
    <Carousel interval={null}>
      {chunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-around">
            {chunk.map((item, idx) => (
              <Card className="h-100 m-2" style={{ width: "18rem" }} key={idx}>
                {getYoutubeVideoId ? (
                  getYoutubeVideoId(item.url) ? (
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
                  )
                ) : (
                  <Card.Img
                    variant="top"
                    src={item.urlToImage || "https://via.placeholder.com/150"}
                  />
                )}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description?.slice(0, 100) + "..."}
                  </Card.Text>
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
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
