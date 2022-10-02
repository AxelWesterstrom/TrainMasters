import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function AutoSuggest({
  stations,
  arrival,
  departure,
  setDeparture,
  setArrival,
  setNoTrain,
}) {
  const [isDepartureFocus, setDepartureFocus] = useState(false);
  const [isArrivalFocus, setArrivalFocus] = useState(false);
  const [suggestDepature, setSuggestDepature] = useState([]);
  const [suggestArrival, setSuggestArrival] = useState([]);
  const [text, setText] = useState("");
  let allStations = [];

  const handleDepature = (e) => {
    let searchValue = e.target.value;
    let suggestion = [];
    for (let station of stations) {
      if (!allStations.includes(station.name)) {
        allStations.push(station.name);
      }
    }

    if (searchValue.length > 0) {
      suggestion = allStations
        .sort()
        .filter(
          (x) =>
            x.charAt(0).toLowerCase() === searchValue.charAt(0).toLowerCase()
        );
    }
    setSuggestDepature(suggestion);
    setDeparture(searchValue);
  };

  const handleArrival = (e) => {
    setText("Alla möjliga stationer");
    setArrivalFocus(true);
    let searchValue = e.target.value;
    let suggestion = [];
    let routes = [];

    for (let station of stations) {
      if (station.name.toLowerCase() === departure.toLowerCase()) {
        routes.push(station.routeId);
      }
    }

    for (let station of stations) {
      for (let route of routes) {
        if (station.routeId === route && station.name !== departure) {
          suggestion.push(station.name);
        }
      }
    }

    suggestion = suggestion.filter((value, index) => {
      return suggestion.indexOf(value) === index;
    });

    if (searchValue.length !== 0) {
      setText("Föreslagna stationer");
      suggestion = suggestion
        .sort()
        .filter(
          (x) =>
            x.charAt(0).toLowerCase() === searchValue.charAt(0).toLowerCase()
        );
    }
    setSuggestArrival(suggestion);
    setArrival(searchValue);

    if (suggestArrival.length === 0) {
      setNoTrain(true);
    }
  };

  return (
    <>
      <Row className="row-centered">
        <Col className="col-lg-6 col-12">
          <Form.Group className="mb-3" controlId="departureStation">
            <Form.Label className="custom-label">Från</Form.Label>

            <Form.Control
              type="text"
              className="customInput"
              value={departure}
              onChange={handleDepature}
              onFocus={() => setDepartureFocus(true)}
              onBlur={() => setDepartureFocus(false)}
            />
            {isDepartureFocus && departure.length !== 0 && (
              <div
                className="customSuggestContainer mt-1"
                style={{ overflowY: "scroll" }}
              >
                <p>Föreslagna stationer</p>
                {suggestDepature.map((item, index) => {
                  return (
                    <div
                      className="custom-text m-1"
                      key={index}
                      onMouseDown={() => {
                        setDeparture(item);
                      }}
                    >
                      {item}
                      {index !== suggestDepature.length - 1 && <hr />}
                    </div>
                  );
                })}
              </div>
            )}
          </Form.Group>
        </Col>
        <Col className="col-lg-6 col-12">
          <Form.Group className="mb-3" controlId="destinationStation">
            <Form.Label className="custom-label">Till</Form.Label>
            <Form.Control
              data-togg
              type="text"
              className="customInput"
              value={arrival}
              onFocus={handleArrival}
              onBlur={() => setArrivalFocus(false)}
              onChange={handleArrival}
            />

            {isArrivalFocus && departure.length !== 0 && (
              <div
                className="customSuggestContainer mt-1"
                style={{ overflowY: "scroll" }}
              >
                <p>{text}</p>
                {suggestArrival.map((item, index) => {
                  return (
                    <div
                      className="custom-text m-1"
                      key={index}
                      onMouseDown={() => {
                        setArrival(item);
                      }}
                    >
                      {item}
                      {index !== suggestArrival.length - 1 && <hr />}
                    </div>
                  );
                })}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

export default AutoSuggest;
