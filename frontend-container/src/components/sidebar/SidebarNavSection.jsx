import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import SidebarNavList from './SidebarNavList';

const SidebarNavSection = (props) => {
  const { title, pages, className, ...rest } = props;

  return (
    <React.Fragment {...rest}>
      {title && <li className={`sidebar-header ${className}`}>{title}</li>}
      <SidebarNavList pages={pages} depth={0} />
    </React.Fragment>
  );
};

SidebarNavSection.propTypes = {
  title: PropTypes.string, // Validate that `title` is a string
  pages: PropTypes.arrayOf(PropTypes.object).isRequired, // Validate that `pages` is an array of objects
  className: PropTypes.string, // Validate (optional) that `className` is a string, remove if unused
};

export default SidebarNavSection;
