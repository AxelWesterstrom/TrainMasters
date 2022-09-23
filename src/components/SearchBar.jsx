import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { react, useEffect, useState } from "react";

function SearchBar({ stations }) {
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggest, setSuggest] = useState([]);

  const handleChange = (e) => {
    let searchValue = e.target.value;
    let suggestion = [];
    if (searchValue.length > 0) {
      suggestion = stations
        .sort()
        .filter(
          (e) =>
            e.charAt(0).toLowerCase() === searchValue.charAt(0).toLowerCase()
        );
    }
    setSuggest(suggestion);
    setInputValue(searchValue);
  };
  const suggestedStation = (value) => {
    setInputValue(value);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <Container className="p-1 m-1">
          <Form className="customContainer">
            <Row className="row-centered">
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="departureStation">
                  <Form.Label className="customInputLabel">Från</Form.Label>
                  <Form.Control
                    type="text"
                    className="customInput"
                    value={inputValue}
                    onFocus={() => setFocus(true)}
                    onChange={handleChange}
                  />

                  {isFocus && inputValue.length !== 0 && (
                    <div className="customSuggestContainer mt-1">
                      {suggest.map((item, index) => {
                        return (
                          <div className="customSuggestionList" key={index}>
                            <div
                              onClick={() => {
                                suggestedStation(item);
                                setFocus(false);
                              }}
                            >
                              {item}
                              {index !== suggest.length - 1 && <hr />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="destinationStation">
                  <Form.Label className="customInputLabel">Till</Form.Label>
                  <Form.Control type="text" className="customInput" />
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
