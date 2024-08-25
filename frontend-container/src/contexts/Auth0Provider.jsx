import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth0 } from '@auth0/auth0-react';
// Remove import for unused config: { domain, clientId, audience }

// Define action types
const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

// Define the initial state
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        error: null,
      };
    case SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case SIGN_OUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

function AuthProvider({ children }) {
  const {
    isAuthenticated,
    user,
    isLoading,
    // Remove unused variable: error
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isLoading) {
      dispatch({
        type: INITIALIZE,
        payload: { isAuthenticated, user },
      });
      console.log('AuthProvider.jsx', 'initializeAuth0', 'User:', user);
    }
  }, [isLoading, isAuthenticated, user]);

  // Context value that will be provided to the rest of the application
  const authContextValue = {
    ...state,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { authContextValue });
        }
        return child;
      })}
    </>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node, // Define the type for children
};

export default AuthProvider;
