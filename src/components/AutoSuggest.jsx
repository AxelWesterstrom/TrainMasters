import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useStates } from "../assets/helpers/states";

function AutoSuggest({
  stations,
  setFoundTrain,
}) {
  const [isDepartureFocus, setDepartureFocus] = useState(false);
  const [isArrivalFocus, setArrivalFocus] = useState(false);
  const [suggestDepature, setSuggestDepature] = useState([]);
  const [suggestArrival, setSuggestArrival] = useState([]);
  let allStations = [];

  let s = useStates("booking")

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
    s.ticket.departure = searchValue;
  };

  const handleArrival = (e) => {
    setArrivalFocus(true);

    let searchValue = e.target.value;
    let suggestions = [];
    let routes = [];

    for (let station of stations) {
      if (station.name.toLowerCase() === s.ticket.departure.toLowerCase()) {
        routes.push(station.routeId);
      }
    }

    for (let station of stations) {
      for (let route of routes) {
        if (station.routeId === route && station.name !== s.ticket.departure) {
          suggestions.push(station.name);
        }
      }
    }

    suggestions = suggestions.filter((value, index) => {
      return suggestions.indexOf(value) === index;
    });

    if (searchValue.length !== 0) {
      suggestions = suggestions
        .sort()
        .filter(
          (x) =>
            x.charAt(0).toLowerCase() === searchValue.charAt(0).toLowerCase()
        );
    }
    setSuggestArrival(suggestions);
    s.ticket.arrival = searchValue;

    for (let suggestion of suggestions) {
      if (suggestion.toLowerCase() === searchValue.toLowerCase()) {
        setFoundTrain(true);
      }
    }
  };

  const handleArrivalOnFocus = () => {
    setArrivalFocus(true);

    let suggestion = [];
    let routes = [];

    for (let station of stations) {
      if (station.name.toLowerCase() === s.ticket.departure.toLowerCase()) {
        routes.push(station.routeId);
      }
    }

    for (let station of stations) {
      for (let route of routes) {
        if (station.routeId === route && station.name !== s.ticket.departure) {
          suggestion.push(station.name);
        }
      }
    }

    suggestion = suggestion.filter((value, index) => {
      return suggestion.indexOf(value) === index;
    });

    setSuggestArrival(suggestion);
  };

  return (
    <>
      <Row className="row-centered">
        <Col className="col-lg-6 col-12">
          <Form.Group className="mb-3" controlId="departureStation">
            <Form.Label className="custom-label">Från</Form.Label>

            <Form.Control
              autoComplete="off"
              type="text"
              className="customInput"
              value={s.ticket.departure}
              onChange={handleDepature}
              onFocus={() => setDepartureFocus(true)}
              onBlur={() => setDepartureFocus(false)}
            />
            {isDepartureFocus && s.ticket.departure.length !== 0 && (
              <div
                className="customSuggestContainer mt-1"
                style={{ overflowY: "scroll" }}
              >
                <p>Föreslagna stationer</p>
                {suggestDepature.map((item, index) => {
                  return (
                    <div
                      className="autoSuggest-text m-1"
                      key={index}
                      onMouseDown={() => {
                        s.ticket.departure = item;
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
              autoComplete="off"
              data-togg
              type="text"
              className="customInput"
              value={s.ticket.arrival}
              onFocus={handleArrivalOnFocus}
              onBlur={() => setArrivalFocus(false)}
              onChange={handleArrival}
            />

            {isArrivalFocus && s.ticket.departure.length !== 0 && (
              <div
                className="customSuggestContainer mt-1"
                style={{ overflowY: "scroll" }}
              >
                <p>Alla möjliga stationer</p>
                {suggestArrival.map((item, index) => {
                  return (
                    <div
                      className="autoSuggest-text m-1"
                      key={index}
                      onMouseDown={() => {
                        s.ticket.arrival = item;
                        setFoundTrain(true);
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
