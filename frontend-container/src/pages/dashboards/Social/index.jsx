import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Timeline from './Timeline';
import User from './User';
import Following from './Following';
import Activities from './Activities';
import useHelmet from '../../../utils/HelmetLoader';

const Social = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Social Dashboard</title>
      </Helmet>
      <Container className="p-0">
        <Row>
          <Col lg="8">
            <Timeline />
          </Col>
          <Col lg="4">
            <User />
            <Following />
            <Activities />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Social;
