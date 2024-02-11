import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import styles from "../styles/NavigationHeader.module.scss";

export default function NavigationHeader() {
  return (
    <header className={styles["navigation-header"]}>
      <Navbar>
        <Container>
          <Navbar.Brand>DM Tools</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="/map">
              <div className="text-sm text-gray-700 underline">Map</div>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
