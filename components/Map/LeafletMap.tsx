import type {
  Map,
  LatLngTuple,
  LatLngExpression,
  TileLayer as LTileLayer,
} from "leaflet";

import Col from "react-bootstrap/Col";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useMemo, useEffect } from "react";
import L from "leaflet";
import RasterCoords from "leaflet-rastercoords";

L.RasterCoords = RasterCoords as typeof L.RasterCoords;

import { DisplayPosition } from "./DisplayPosition";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import styles from "../../styles/LeafletMap.module.scss";

function LeafletMapWithDebug({
  debug,
  tilesPath,
  mapImageOrigDimensions,
}: {
  debug: boolean;
  tilesPath: string;
  mapImageOrigDimensions: { width: number; height: number };
}) {
  const [map, setMap] = useState<Map | null>(null);
  const [tileLayer, setTileLayer] = useState<LTileLayer | null>(null);
  const [raster, setRaster] = useState<L.RasterCoords | null>(null);

  useEffect(() => {
    if (map && !raster) {
      const newRaster = new L.RasterCoords(map, [
        mapImageOrigDimensions.width,
        mapImageOrigDimensions.height,
      ]);
      setRaster(newRaster);
      return;
    }

    if (map && raster) {
      const newCenter = raster.getMaxBounds().getCenter();
      map.setMaxBounds(raster.getMaxBounds().pad(0.5));
      map.setMaxZoom(raster.zoomLevel());
      map.setView(newCenter, map.getZoom(), { animate: false });
      return;
    }
  }, [mapImageOrigDimensions, map, tileLayer, raster, setRaster]);

  const displayMap = useMemo(() => {
    return (
      <MapContainer
        center={[0, 0]}
        zoom={4}
        minZoom={0}
        maxZoom={5}
        scrollWheelZoom={false}
        ref={setMap}
        crs={L.CRS.Simple}
      >
        {raster ? (
          <TileLayer
            url={`${tilesPath}/{z}/{x}/{y}.png`}
            noWrap={true}
            attribution={""}
            ref={setTileLayer}
            bounds={raster.getMaxBounds()}
            maxNativeZoom={raster.zoomLevel() - 1}
          />
        ) : null}
      </MapContainer>
    );
  }, [tilesPath, raster, setMap, setTileLayer]);

  return (
    <div
      className={"text-white"}
      style={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
    >
      {map && debug ? (
        <DisplayPosition map={map} center={[0, 0]} zoom={4} raster={raster} />
      ) : null}
      {displayMap}
    </div>
  );
}

export default function LeafletMap({
  tilesPath,
  mapImageOrigDimensions,
  debug = true,
}: {
  tilesPath: string;
  mapImageOrigDimensions: { width: number; height: number };
  debug?: boolean;
}) {
  return (
    <Col>
      <div className={styles["dm-tools-leaflet-map"]}>
        <LeafletMapWithDebug
          debug={debug}
          tilesPath={tilesPath}
          mapImageOrigDimensions={mapImageOrigDimensions}
        />
      </div>
    </Col>
  );
}
