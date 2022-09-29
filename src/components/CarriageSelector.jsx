import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import SeatsSelector from "./SeatsSelector";

function CarriageSelector({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Välj plats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SeatsSelector />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CarriageSelector;
