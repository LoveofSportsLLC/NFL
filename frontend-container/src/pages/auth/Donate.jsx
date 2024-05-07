// DonatePage.js
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Button } from "react-bootstrap";
import DonateModal from "./DonateModal"; // Import the DonateModal component

const DonatePage = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  const handleDonateClick = () => setShowDonateModal(true);
  const handleCloseDonateModal = () => setShowDonateModal(false);

  return (
    <React.Fragment>
      <Helmet title="Sign Up" />
      <div className="text-center mt-4">
        <h1 className="h2">Get started</h1>
        <p className="lead">
          Start creating the best possible user experience for your customers.
        </p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Button onClick={handleDonateClick}>Donate</Button>
            <DonateModal
              show={showDonateModal}
              onHide={handleCloseDonateModal}
            />
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default DonatePage;
