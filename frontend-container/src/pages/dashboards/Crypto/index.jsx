import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Chart from './Chart';
import Header from './Header';
import Markets from './Markets';
import Orders from './Orders';
import useHelmet from '../../../utils/HelmetLoader';

const Crypto = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <Container fluid className="p-0">
        <Header />
        <Tickers />
        <Row>
          <Col lg="5" className="d-flex col-xxl-4">
            <Markets />
          </Col>
          <Col lg="7" className="d-flex col-xxl-8">
            <Chart />
          </Col>
        </Row>
        <Orders />
      </Container>
    </React.Fragment>
  );
};

export default Crypto;
