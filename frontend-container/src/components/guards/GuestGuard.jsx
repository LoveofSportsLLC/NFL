import * as React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isInitialized && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

GuestGuard.propTypes = {
  children: PropTypes.node.isRequired, // Define the type for children
};

export default GuestGuard;
