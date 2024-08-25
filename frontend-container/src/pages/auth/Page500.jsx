// src/pages/auth/Page500.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useHelmet from '../../utils/HelmetLoader';

const Page500 = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>500 Error</title>
      </Helmet>
      <div className="text-center">
        <h1 className="display-1 fw-bold">500</h1>
        <p className="h2">Internal server error.</p>
        <p className="lead fw-normal mt-3 mb-4">
          The server encountered something unexpected that didn&rsquo;t allow it
          to complete the request.
        </p>
        <Link to="/dashboard/default">
          <Button variant="primary" size="lg">
            Return to website
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Page500;
