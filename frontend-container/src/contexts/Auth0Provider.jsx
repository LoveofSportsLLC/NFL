import { useEffect, useReducer } from "react";
import { Auth0Client } from "@auth0/auth0-spa-js";
import AuthContext from "./Auth0Context";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null, // Added error state
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

// Initialize Auth0 client outside of useEffect
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
        console.log("initializeAuth0 user:", user); // Add this line
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated, user },
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null, error: err },
        });
      }
    };

    initializeAuth0();
  }, []);

const [loginCount, setLoginCount] = useState(0);

const signIn = async () => {
  try {
    await auth0Client.loginWithPopup();
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    console.log("signIn user:", user);
    dispatch({ type: SIGN_IN, payload: { user } });
    setLoginCount(loginCount + 1); // Add this line
  } catch (error) {
    console.error("Login Failed:", error);
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
