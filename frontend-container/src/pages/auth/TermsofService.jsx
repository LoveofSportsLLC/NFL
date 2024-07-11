// TermsofServicePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TermsofService from '../../components/auth/TermsofService'; // Import the TermsofService component
import useHelmet from '../../utils/HelmetLoader'; // Import the utility module

const TermsofServicePage = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Terms of Service</title>
      </Helmet>
      <div className="text-center">
        <h1 className="display-1 fw-bold">Terms of Service</h1>
        <p className="lead fw-normal mt-3 mb-4">
          Read our terms and conditions for using LoveOfFootball.io.
        </p>
        <TermsofService />
        <Link to="/dashboard/default">
          <Button variant="primary" size="lg">
            Return to website
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default TermsofServicePage;
