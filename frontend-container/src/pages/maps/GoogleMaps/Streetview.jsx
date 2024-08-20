import React, { useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

const Streetview = () => {
  const panoramaRef = useRef(null);

  const getMapOptions = () => {
    return {
      fullscreenControl: true,
      mapTypeControl: true,
      scaleControl: true,
      scrollwheel: false,
      streetViewControl: true,
    };
  };

  const apiIsLoaded = (map, maps) => {
    if (map && panoramaRef.current) {
      const panorama = new maps.StreetViewPanorama(
        panoramaRef.current, // Use the ref directly here
        {
          position: {
            lat: 42.345573,
            lng: -71.098326,
          },
          pov: {
            heading: 160,
            pitch: 0,
          },
          visible: true,
        },
      );
      map.setStreetView(panorama);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Streetview</Card.Title>
        <h6 className="card-subtitle text-muted">
          Panoramic 360 degree views from designated roads throughout its
          coverage area.
        </h6>
      </Card.Header>
      <Card.Body>
        <div style={{ height: 300, width: '100%' }} ref={panoramaRef}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_API_KEY, // Assuming you're using an environment variable for this
            }}
            defaultCenter={{
              lat: 40.712784,
              lng: -74.005941,
            }}
            defaultZoom={14}
            options={getMapOptions}
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            yesIWantToUseGoogleMapApiInternals={true}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Streetview;
