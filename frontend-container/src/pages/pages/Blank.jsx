import React from 'react';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import { Card, Col, Container, Row } from 'react-bootstrap';

const Blank = () => {
  const Helmet = useHelmet();

  if (!Helmet) {
    return null; // Or a loading spinner, if desired
  }

  return (
    <React.Fragment>
      <Helmet title="Blank Page" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Blank Page</h1>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">Empty card</Card.Title>
              </Card.Header>
              <Card.Body>&nbsp;</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Blank;
