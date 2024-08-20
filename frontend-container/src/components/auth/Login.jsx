import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { audience } from '../../config';

const LoginButton = () => {
  const { loginWithRedirect, error, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      // Specify the audience for which the access token is intended
      audience: audience,
      // Specify the scopes that your application needs
      scope: 'read:posts write:posts',
      // Optional: Force a consent prompt
      prompt: 'consent',
    });
  };

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
      {error && (
        <Alert
          variant="danger"
          style={{ fontSize: '18px', color: 'red' }}
          className="custom-alert"
        >
          <strong>Error:</strong> {error.message}
        </Alert>
      )}

      <div className="text-center mt-3">
        <Button onClick={handleLogin} variant="primary" size="lg">
          Login with Auth0
        </Button>
      </div>

      <small>
        <Link to="/auth/reset-password">Forgot password?</Link>
      </small>

      <div className="text-center mt-3">
        <Link to="/auth/termsofservice">Terms of Service</Link> |{' '}
        <Link to="/auth/privacypolicy">Privacy Policy</Link>
      </div>
    </>
  );
};

export default LoginButton;
