"use client";

import dynamic from "next/dynamic";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Map() {
  const MapWithNoSSR = dynamic(
    () => import("../../components/Map/LeafletMap"),
    {
      ssr: false,
    }
  );

  const imageDimensions = {
    height: 9000,
    width: 6429,
  };

  return (
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
        <MapWithNoSSR
          tilesPath={"/images/tiles"}
          mapImageOrigDimensions={imageDimensions}
        ></MapWithNoSSR>
      </Row>
    </Container>
  );
}
