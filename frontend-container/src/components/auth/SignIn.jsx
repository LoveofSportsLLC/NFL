import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Alert, Spinner } from "react-bootstrap";

function SignIn() {
  const { loginWithRedirect, error, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {/* Display error message if there is an error */}
      {error && (
        <Alert
          variant="danger"
          style={{ fontSize: '18px', color: 'red' }}
          className="custom-alert"
        >
          <strong>Error:</strong> {error.message}
        </Alert>
      )}

      {/* Auth0 Sign In Button */}
      <div className="text-center mt-3">
        <Button onClick={() => loginWithRedirect()} variant="primary" size="lg">
          Sign in with Auth0
        </Button>
      </div>

      <small>
        <Link to="/auth/reset-password">Forgot password?</Link>
      </small>

      {/* Terms of Service and Privacy Policy Links */}
      <div className="text-center mt-3">
        <Link to="/auth/termsofservice">Terms of Service</Link> |{" "}
        <Link to="/auth/privacypolicy">Privacy Policy</Link>
      </div>
    </>
  );
}

export default SignIn;