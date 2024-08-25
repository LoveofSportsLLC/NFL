import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import SidebarNavSection from './SidebarNavSection';

const SidebarNav = ({ items }) => {
  return (
    <ul className="sidebar-nav">
      {items &&
        items.map((item) => (
          <SidebarNavSection
            key={item.title}
            pages={item.pages}
            title={item.title}
          />
        ))}
    </ul>
  );
};

SidebarNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, // Prop validation for title
      pages: PropTypes.arrayOf(PropTypes.object).isRequired, // Prop validation for pages
    }),
  ).isRequired, // Validate that `items` is an array of objects
};

export default SidebarNav;
