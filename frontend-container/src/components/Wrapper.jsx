import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

const Wrapper = ({ children }) => <div className="wrapper">{children}</div>;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired, // Define the type for children
};

export default Wrapper;
