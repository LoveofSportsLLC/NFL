//NFL/frontend-container/src/contexts/AuthGuard.jsx
import * as React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { log } from "../../utils/logs";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  log("AuthGuard.jsx", "AuthGuard", "isAuthenticated:", isAuthenticated);
  log("AuthGuard.jsx", "AuthGuard", "isInitialized:", isInitialized);

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
