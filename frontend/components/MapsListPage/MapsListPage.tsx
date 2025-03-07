"use client";
import type { Map } from "@prisma/client";
import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MapModal from "../MapModal/MapModal";
import MapsList from "./MapsList";
import Loading from "../Loading";

const fetcher: Fetcher<Map[]> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function MapsListPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: maps, mutate } = useSWR("/api/maps", fetcher);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    mutate();
    setShow(false);
  };
  const handleOpen = () => setShow(true);
  const handleDeleteMap = async (id: number) => {
    await fetch(`/api/maps/${id}`, {
      method: "DELETE",
    });
    mutate();
  };

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
          {maps ? (
            <MapsList maps={maps} handleDeleteMap={handleDeleteMap} />
          ) : (
            <Loading />
          )}
        </Row>
        {children}
      </Container>
    </>
  );
}
