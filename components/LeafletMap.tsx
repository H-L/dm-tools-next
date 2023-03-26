import Col from "react-bootstrap/Col";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import styles from "../styles/LeafletMap.module.scss";

export default function LeafletMap() {
  return (
    <Col>
      <div className={styles["dm-tools-leaflet-map"]}>
        <MapContainer center={[0, 0]} zoom={3}>
          <TileLayer
            attribution="Waterdeep !"
            url={"/images/tiles/{z}/{x}/{y}.png"}
          />
        </MapContainer>
      </div>
    </Col>
  );
}
