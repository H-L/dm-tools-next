import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface MapModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function MapModal({ show, handleClose }: MapModalProps) {
  const submitFormData = () => {
    return new Promise((resolve, reject) => {
      const fileInput = document.getElementById("mapFile") as HTMLInputElement;
      const mapNameInput = document.getElementById(
        "mapName"
      ) as HTMLInputElement;

      if (!fileInput || !fileInput.files || !mapNameInput) {
        return;
      }

      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("mapFile", file);
      formData.append("mapName", mapNameInput.value);

      fetch("/api/maps", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const saveMap = () => {
    submitFormData()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        // Invalidate form
      });
  };

  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="mapName">
            <Form.Label>Map name</Form.Label>
            <Form.Control type="text" placeholder="My new map" />
          </Form.Group>
          <Form.Group controlId="mapFile" className="mb-3">
            <Form.Label>Map file</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveMap}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
