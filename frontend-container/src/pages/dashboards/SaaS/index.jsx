import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Activity from './Activity';
import BarChart from './BarChart';
import Header from './Header';
import Products from './Products';
import Statistics from './Statistics';
import USAMap from './USAMap';
import useHelmet from '../../../utils/HelmetLoader';

const SaaS = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>SaaS Dashboard</title>
      </Helmet>
      <Container fluid className="p-0">
        <Header />
        <Statistics />
        <Row>
          <Col lg="4" className="d-flex">
            <USAMap />
          </Col>
          <Col md="7" lg="4" className="col-xxl-6 d-flex">
            <BarChart />
          </Col>
          <Col md="5" lg="4" className="col-xxl-2 d-flex">
            <Activity />
          </Col>
        </Row>
        <Products />
      </Container>
    </React.Fragment>
  );
};

export default SaaS;
