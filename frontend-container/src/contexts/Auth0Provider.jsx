//NFL/frontend-container/src/contexts/AuthProvider.jsx
import { useEffect, useReducer } from "react";
import { Auth0Client } from "@auth0/auth0-spa-js";
import AuthContext from "./Auth0Context";
import { log } from "../utils/logs"; // Import the log utility

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
};

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

const auth0Client = new Auth0Client({
  domain: process.env.VITE_APP_AUTH0_DOMAIN,
  client_id: process.env.VITE_APP_AUTH0_CLIENT_ID,
  audience: process.env.VITE_APP_AUTH0_AUDIENCE,
  redirect_uri: window.location.origin,
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initializeAuth0 = async () => {
      try {
        await auth0Client.checkSession();
        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;
        log("AuthProvider.jsx", "initializeAuth0", "User:", user);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated, user },
        });
      } catch (err) {
        log("AuthProvider.jsx", "initializeAuth0", "Error:", err.message);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null, error: err },
        });
      }
    };

    initializeAuth0();
  }, []);

  const signIn = async () => {
    try {
      await auth0Client.loginWithPopup();
      const isAuthenticated = await auth0Client.isAuthenticated();
      const user = isAuthenticated ? await auth0Client.getUser() : null;
      log("AuthProvider.jsx", "signIn", "User:", user);
      dispatch({ type: SIGN_IN, payload: { user } });
    } catch (error) {
      log("AuthProvider.jsx", "signIn", "Login Failed:", error.message);
    }
  };

  const signOut = () => {
    auth0Client.logout();
    dispatch({ type: SIGN_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
