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
        <style jsx>{`
          .leaflet-bottom,
          .leaflet-control,
          .leaflet-pane,
          .leaflet-top {
            z-index: 0 !important;
          }

          .leaflet-container {
            min-height: 400px;
            height: 100%;
            max-height: 80vh;
          }
        `}</style>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Col>
  );
}
