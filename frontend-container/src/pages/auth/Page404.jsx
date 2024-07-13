import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useHelmet from '../../utils/HelmetLoader';

const Page404 = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="h2">Page not found.</p>
        <p className="lead fw-normal mt-3 mb-4">
          The page you are looking for might have been removed.
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

export default Page404;
