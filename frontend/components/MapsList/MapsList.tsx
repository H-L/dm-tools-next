"use client";

import type { Map } from "@prisma/client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import MapModal from "../../components/MapModal/MapModal";
import MapsListItem from "./MapsListItem";

export default function MapsList({
  children,
  maps = [],
}: {
  children: React.ReactNode;
  maps: Map[];
}) {
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
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image path</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {maps.map((map) => {
                return <MapsListItem key={map.id} map={map} />;
              })}
            </tbody>
          </Table>
        </Row>
        {children}
      </Container>
    </>
  );
}
