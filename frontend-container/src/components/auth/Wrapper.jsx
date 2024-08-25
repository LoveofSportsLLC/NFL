import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { useAuth0 } from '@auth0/auth0-react';

function Wrapper({ children }) {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return <div className="wrapper">{children}</div>;
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired, // Define the type for children
};

export default Wrapper;
