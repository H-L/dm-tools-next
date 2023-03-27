import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useCallback, useEffect, useMemo } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import styles from "../styles/LeafletMap.module.scss";
import type { LatLngTuple, Map } from "leaflet";

const center: LatLngTuple = [0, 0];
const zoom = 3;

function DisplayPosition({ map }: { map: Map }) {
  const [position, setPosition] = useState(() => map.getCenter());
  const [currentZoom, setZoom] = useState(() => map.getZoom());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  const onZoom = useCallback(() => {
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    map.on("zoom", onZoom);
    return () => {
      map.off("move", onMove);
      map.off("zoom", onZoom);
    };
  }, [map, onMove, onZoom]);

  return (
    <div style={{ backgroundColor: "#444950" }} className="text-white">
      <p className="p-2 d-flex flex-nowrap align-items-center">
        <span className="text me-4">
          latitude: {position.lat.toFixed(4)}, longitude:{" "}
          {position.lng.toFixed(4)}, zoom: {currentZoom}
        </span>
        <Button onClick={onClick}>reset</Button>
      </p>
    </div>
  );
}

function ExternalStateExample() {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={0}
        maxZoom={5}
        scrollWheelZoom={true}
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
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}

export default function LeafletMap() {
  return (
    <Col>
      <div className={styles["dm-tools-leaflet-map"]}>
        <ExternalStateExample />
      </div>
    </Col>
  );
}
