import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { Row, Col, ListGroup } from 'react-bootstrap';

const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
  <ListGroup.Item>
    <Row className="align-items-center g-0">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? 'pl-2' : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroup.Item>
);

NavbarDropdownItem.propTypes = {
  icon: PropTypes.node.isRequired, // Expecting a renderable node
  title: PropTypes.string.isRequired, // Expecting a string
  description: PropTypes.string.isRequired, // Expecting a string
  time: PropTypes.string.isRequired, // Expecting a string (or Date object as needed)
  spacing: PropTypes.bool, // Expecting a boolean, optional
};

export default NavbarDropdownItem;
