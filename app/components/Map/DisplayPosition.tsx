import type { Map, MapOptions, RasterCoords } from "leaflet";

import Button from "react-bootstrap/Button";
import { useState, useCallback, useEffect } from "react";

import styles from "../../styles/LeafletMap.module.scss";

export function DisplayPosition({
  map,
  center,
  zoom,
  raster,
}: {
  map: Map;
  center: MapOptions["center"];
  zoom: number;
  raster: RasterCoords | null;
}) {
  const [position, setPosition] = useState(() => map.getCenter());
  const [currentZoom, setZoom] = useState(() => map.getZoom());

  const onClick = useCallback(() => {
    if (typeof center === "undefined") {
      return;
    }

    map.setView(raster?.getMaxBounds().getCenter() || center, zoom);
  }, [map, center, zoom, raster]);

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
    <div className={styles["map-debug-header"]}>
      <p className="p-2 d-flex flex-nowrap align-items-center mb-0">
        <span className="text col-4 me-4">
          Latitude: {position.lat.toFixed(4)}, Longitude:{" "}
          {position.lng.toFixed(4)}, Zoom: {currentZoom}
        </span>
        <Button onClick={onClick}>Reset</Button>
      </p>
    </div>
  );
}
