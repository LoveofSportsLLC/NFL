//NFL/frontend-container/src/contexts/AuthGuard.jsx
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log(
    'AuthGuard.jsx',
    'AuthGuard',
    'isAuthenticated:',
    isAuthenticated,
  );
  console.log('AuthGuard.jsx', 'AuthGuard', 'isLoading:', isLoading);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
