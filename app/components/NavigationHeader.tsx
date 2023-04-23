import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import styles from "../styles/NavigationHeader.module.scss";

export default function NavigationHeader() {
  return (
    <header className={styles["navigation-header"]}>
      <Navbar>
        <Container>
          <Navbar.Brand>DM Tools</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
