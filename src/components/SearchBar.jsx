import { Row, Col, Button, Form, Container } from "react-bootstrap";

function SearchBar() {
  return (
    <>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <Container className="p-1 m-1">
          <Form className="customContainer">
            <Row className="row-centered">
              <Col className="col-lg-6 col-md-12">
                <Form.Group className="mb-3" controlId="departureStation">
                  <Form.Label>Från</Form.Label>
                  <Form.Control type="text" className="customInput" />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-md-12">
                <Form.Group className="mb-3" controlId="destinationStation">
                  <Form.Label>Till</Form.Label>
                  <Form.Control type="password" className="customInput" />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button className="customButton" type="submit">
                Sök
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default SearchBar;
