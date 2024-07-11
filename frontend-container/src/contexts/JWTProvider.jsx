//NFL/frontend-container/src/contexts/JWTProvider.jsx
import { useEffect, useReducer } from "react";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";
import AuthContext from "./JWTContext";
import { log } from "../utils/logs"; // Import the log utility

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get("/api/auth/my-account");
          const { user } = response.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        log("JWTProvider.jsx", "initialize", "Error:", err.message);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });
      const { accessToken, user } = response.data;

      setSession(accessToken);
      dispatch({
        type: SIGN_IN,
        payload: { user },
      });
    } catch (error) {
      log("JWTProvider.jsx", "signIn", "Error:", error.message);
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post("/api/auth/sign-up", {
        email,
        password,
        firstName,
        lastName,
      });
      const { accessToken, user } = response.data;

      window.localStorage.setItem("accessToken", accessToken);
      dispatch({
        type: SIGN_UP,
        payload: { user },
      });
    } catch (error) {
      log("JWTProvider.jsx", "signUp", "Error:", error.message);
    }
  };

  const resetPassword = (email) => {
    log("JWTProvider.jsx", "resetPassword", "Email:", email);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
