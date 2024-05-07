// src/components/auth/AuthCallback.jsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      // Maybe trigger a loading state
      return;
    }
    if (error) {
      // Handle errors, such as by displaying a message
      console.error("Authentication error:", error);
      navigate("/error"); // Redirect to an error page or back to login
    }
    if (isAuthenticated) {
      // Redirect to the intended or default secured page
      navigate("/dashboard/default");
    } else {
      // Redirect to login page
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, error, navigate]);

  // Optionally display a loading indicator, or a blank page, or even a status message
  return <div>Loading...</div>;
};

export default AuthCallback;
