// src/pages/auth/ResetPassword.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ResetPassword from '../../components/auth/ResetPassword';
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module

const ResetPasswordPage = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="text-center mt-4">
        <h1 className="h2">Reset password</h1>
        <p className="lead">Enter your email to reset your password.</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <ResetPassword />
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mb-3">
        Don&rsquo;t have an account? <Link to="/auth/sign-up">Sign up</Link>
      </div>
    </React.Fragment>
  );
};

export default ResetPasswordPage;
