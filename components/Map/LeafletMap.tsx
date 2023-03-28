import type { Map, LatLngTuple } from "leaflet";

import Col from "react-bootstrap/Col";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useMemo } from "react";

import { DisplayPosition } from "./DisplayPosition";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import styles from "../../styles/LeafletMap.module.scss";

const center: LatLngTuple = [0, 0];
const zoom = 3;

function LeafletMapWithDebug({ debug }: { debug: boolean }) {
  const [map, setMap] = useState<Map | null>(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={0}
        maxZoom={5}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          tms={true}
          noWrap={true}
          url={"/images/tiles/{z}/{x}/{y}.png"}
          attribution={"Waterdeep"}
        />
      </MapContainer>
    ),
    []
  );

  return (
    <div
      className={"text-white"}
      style={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
    >
      {map && debug ? (
        <DisplayPosition map={map} center={center} zoom={zoom} />
      ) : null}
      {displayMap}
    </div>
  );
}

export default function LeafletMap({ debug = true }) {
  return (
    <Col>
      <div className={styles["dm-tools-leaflet-map"]}>
        <LeafletMapWithDebug debug={debug} />
      </div>
    </Col>
  );
}
