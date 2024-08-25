import React from 'react';
import { Navbar } from 'react-bootstrap';
import useSidebar from '../../hooks/useSidebar';

const NavbarMinimal = () => {
  const { isOpen, setIsOpen } = useSidebar();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Navbar variant="light" expand className="navbar-bg">
      <span
        className="sidebar-toggle d-flex"
        role="button"
        tabIndex="0"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <i className="hamburger align-self-center" />
      </span>
    </Navbar>
  );
};

export default NavbarMinimal;
