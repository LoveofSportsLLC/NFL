import React from 'react';
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
                "For the Love of Sports"
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

export default Sidebar;
