import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import classNames from 'classnames';

const Main = ({ className, children }) => (
  <div className={classNames('main', className)}>{children}</div>
);

Main.propTypes = {
  className: PropTypes.string, // Validate that `className` is a string
  children: PropTypes.node.isRequired, // Define the type for children as required
};

export default Main;
