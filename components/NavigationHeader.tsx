import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function NavigationHeader() {
  return (
    <header>
      <Navbar>
        <Container>
          <Navbar.Brand>DM Tools</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
