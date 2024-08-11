// Import necessary dependencies from @auth0/auth0-react
import React, { useEffect, useReducer } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { log } from '../utils/logs';
import { domain, clientId, audience } from '../config';

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
    error,
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
      log('AuthProvider.jsx', 'initializeAuth0', 'User:', user);
    }
  }, [isLoading, isAuthenticated, user]);

  // Context value that will be provided to the rest of the application
  // Directly use the state and functions from useAuth0 and the local reducer
  const authContextValue = {
    ...state,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  };

  // Since AuthContext is no longer used, we directly return the children wrapped with the necessary context values
  // This could be a React Context if needed, or simply pass down props to children components
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

export default AuthProvider;
