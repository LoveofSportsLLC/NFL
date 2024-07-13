import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Appointments from './Appointments';
import BarChart from './BarChart';
import Calendar from './Calendar';
import Feed from './Feed';
import PieChart from './PieChart';
import Projects from './Projects';
import Statistics from './Statistics';
import NFLScoreCard from './LiveScores';
import useHelmet from '../../../utils/HelmetLoader';

const Default = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Default Dashboard</title>
      </Helmet>
      <Container fluid className="p-0">
        <Header />
        <Statistics />
        <Row>
          <Col lg="8" className="d-flex">
            <NFLScoreCard />
          </Col>
          <Col lg="4" className="d-flex">
            <Feed />
          </Col>
        </Row>
        <Row>
          <Col lg="6" xl="4" className="d-flex">
            <Calendar />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <PieChart />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <Appointments />
          </Col>
        </Row>
        <Projects />
      </Container>
    </React.Fragment>
  );
};

export default Default;
