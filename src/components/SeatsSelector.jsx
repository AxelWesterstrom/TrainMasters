import { Container } from "react-bootstrap";

function SeatsSelector() {
  return (
    <>
      <Container className="p-2">
        <Container className="seat-selector-container p-5">
          <p className="custom-label m-4">Välj plats</p>
        </Container>
      </Container>
    </>
  );
}

export default SeatsSelector;
