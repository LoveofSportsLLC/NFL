import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import PerfectScrollbar from 'react-perfect-scrollbar';

import useSidebar from '../../hooks/useSidebar';
import SidebarFooter from './SidebarFooter';
import SidebarNav from './SidebarNav';

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <div className="brand-icon">
              {/* Update the src attribute here */}
              <img src="/logo.svg" alt="Logo" />
            </div>
            <div className="brand-text">
              <span className="align-middle me-3">
                &quot;For the Love of Sports&quot;
              </span>
            </div>
          </a>
          <SidebarNav items={items} />
          {!!showFooter && <SidebarFooter />}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired, // Validate that `items` is an array of objects
  showFooter: PropTypes.bool, // Validate that `showFooter` is a boolean
};

export default Sidebar;
