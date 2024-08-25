import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { Dropdown, ListGroup } from 'react-bootstrap';

const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon,
}) => (
  <Dropdown className="me-2 nav-item" align="end">
    <Dropdown.Toggle as="a" className="nav-link nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </Dropdown.Toggle>
    <Dropdown.Menu drop="end" className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count}
        {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <Dropdown.Header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </Dropdown.Header>
    </Dropdown.Menu>
  </Dropdown>
);

NavbarDropdown.propTypes = {
  children: PropTypes.node, // Validate that `children` is a renderable node
  count: PropTypes.number, // Ensure `count` is a number
  showBadge: PropTypes.bool, // Ensure `showBadge` is a boolean
  header: PropTypes.node, // Validate that `header` is a renderable node
  footer: PropTypes.node, // Validate that `footer` is a renderable node
  icon: PropTypes.elementType.isRequired, // Ensure `icon` is a component, required
};

export default NavbarDropdown;
