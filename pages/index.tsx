import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/LeafletMap"), {
    ssr: false,
  });

  return (
    <Layout>
      <Container>
        <Row>
          <h1>DM Maps</h1>
          <p>
            Create interactive maps from images, add some markers and point of
            interest with description and links to moodboards, battlemaps, or
            anything else !
          </p>
        </Row>
        <Row>
          <MapWithNoSSR></MapWithNoSSR>
        </Row>
      </Container>
    </Layout>
  );
}
