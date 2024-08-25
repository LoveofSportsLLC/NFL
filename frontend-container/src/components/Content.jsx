import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

const Content = ({ children }) => <div className="content">{children}</div>;

Content.propTypes = {
  children: PropTypes.node.isRequired, // Define the type for children
};

export default Content;
