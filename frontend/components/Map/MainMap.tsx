"use client";

import dynamic from "next/dynamic";
import type { Map } from "@prisma/client";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function MainMap({
  children,
  map,
}: {
  children?: React.ReactNode;
  map: Map;
}) {
  console.log("Map", map);
  const MapWithNoSSR = dynamic(() => import("@/components/Map/LeafletMap"), {
    ssr: false,
  });

  const imageDimensions = {
    height: map.height,
    width: map.width,
  };

  return (
    <Container>
      <Row>
        <h1>
          {map.name} (id: {map.id})
        </h1>
      </Row>
      <Row>
        {/* TODO: Add dynamic domainName */}
        <MapWithNoSSR
          tilesPath={`http://localhost:8001/${map.tilesPath}`}
          mapImageOrigDimensions={imageDimensions}
        ></MapWithNoSSR>
      </Row>
    </Container>
  );
}
