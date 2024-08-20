// DonateModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
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

export default DonateModal;
