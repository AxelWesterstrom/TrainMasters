import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../public/css/journey.css";

function JourneyList(props) {
  let { departure, arrival } = props;
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/connectStationsOnJourneyId?stationNameA=${departure}&stationNameB=${arrival}`
      );
      setJourneys(await data.json());
    }
    fetchData();
  }, []);

  return (
    <>
      {journeys.map((journey, index) => (
        <Journey key={index} {...{ journey }} />
      ))}
    </>
  );
}
export default JourneyList;
