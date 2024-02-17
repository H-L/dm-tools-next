"use client";

import { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import MapModal from "../../components/MapModal/MapModal";

export default function Maps() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <>
      <MapModal show={show} handleClose={handleClose} />
      <Container>
        <Row>
          <h1>DM Maps</h1>
          <p>
            Create interactive maps from images, add some markers and point of
            interest with description and links to moodboards, battlemaps, or
            anything else !
          </p>
        </Row>
        <Row>
          <Col className="mb-3">
            <Button onClick={handleOpen}>+ New Map</Button>
          </Col>
        </Row>
        <Row>
          <Col>Map 1</Col>
          <Col>Map 2</Col>
          <Col>Map 3</Col>
          <Col>Map 4</Col>
        </Row>
      </Container>
    </>
  );
}
