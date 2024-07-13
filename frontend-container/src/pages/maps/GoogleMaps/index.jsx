import React from 'react';
import useHelmet from '../../../utils/HelmetLoader';
import { Col, Container, Row } from 'react-bootstrap';

import Default from './Default';
import Hybrid from './Hybrid';
import Streetview from './Streetview';
import Markers from './Markers';

const GoogleMaps = () => {
  const Helmet = useHelmet();

  if (!Helmet) {
    return null; // Or a loading spinner, if desired
  }

  return (
    <React.Fragment>
      <Helmet title="Google Maps" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Google Maps</h1>

        <Row>
          <Col lg="6">
            <Default />
          </Col>
          <Col lg="6">
            <Hybrid />
          </Col>
          <Col lg="6">
            <Streetview />
          </Col>
          <Col lg="6">
            <Markers />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default GoogleMaps;
