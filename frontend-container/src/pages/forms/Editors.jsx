import React from 'react';
import ReactQuill from 'react-quill';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module
import { Card, Container } from 'react-bootstrap';

const Quill = () => (
  <Card>
    <Card.Header>
      <Card.Title>Quill</Card.Title>
      <h6 className="card-subtitle text-muted">
        Modern WYSIWYG editor built for compatibility and extensibility.
      </h6>
    </Card.Header>
    <Card.Body>
      <ReactQuill placeholder="Type something" />
    </Card.Body>
  </Card>
);

const Bubble = () => (
  <Card>
    <Card.Header>
      <Card.Title>Bubble</Card.Title>
      <h6 className="card-subtitle text-muted">
        Bubble is a simple tooltip based theme for Quill.
      </h6>
    </Card.Header>
    <Card.Body>
      <ReactQuill theme="bubble" placeholder="Compose an epic..." />
    </Card.Body>
  </Card>
);

const Editors = () => {
  const Helmet = useHelmet();

  if (!Helmet) {
    return null; // Or a loading spinner, if desired
  }

  return (
    <React.Fragment>
      <Helmet title="Editors" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Editors</h1>

        <Quill />
        <Bubble />
      </Container>
    </React.Fragment>
  );
};

export default Editors;
