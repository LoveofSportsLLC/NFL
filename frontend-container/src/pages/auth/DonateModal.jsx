import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes
import Donate from '../../components/auth/Donate';

function DonateModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Donate</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Donate />
      </Modal.Body>
    </Modal>
  );
}

DonateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default DonateModal;
