import React, { Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SSRFriendlyWrapper from '../../../components/SSRFriendlyWrapper';
import useHelmet from '../../../utils/HelmetLoader';

const loadComponent = (component) => {
  return React.lazy(() => import(`./components/${component}.jsx`));
};

const Line = loadComponent('Line');
const Area = loadComponent('Area');
const Bar = loadComponent('Bar');
const Column = loadComponent('Column');
const Pie = loadComponent('Pie');
const Heatmap = loadComponent('Heatmap');
const Mixed = loadComponent('Mixed');
const Candlestick = loadComponent('Candlestick');

const ApexCharts = () => {
  const Helmet = useHelmet();

  return (
    <React.Fragment>
      {Helmet && <Helmet title="ApexCharts" />}
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">ApexCharts</h1>
        <SSRFriendlyWrapper>
          <Row>
            <Col lg="6">
              <Suspense fallback={<div>Loading Line...</div>}>
                <Line />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Area...</div>}>
                <Area />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Bar...</div>}>
                <Bar />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Column...</div>}>
                <Column />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Pie...</div>}>
                <Pie />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Heatmap...</div>}>
                <Heatmap />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Mixed...</div>}>
                <Mixed />
              </Suspense>
            </Col>
            <Col lg="6">
              <Suspense fallback={<div>Loading Candlestick...</div>}>
                <Candlestick />
              </Suspense>
            </Col>
          </Row>
        </SSRFriendlyWrapper>
      </Container>
    </React.Fragment>
  );
};

export default ApexCharts;
