import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import "../../public/css/journey.css";
import { useStates } from "../assets/helpers/states";

function JourneyList() {
  let s = useStates("booking");

  const [journeys, setJourneys] = useState([]);
  const [weekday, setWeekday] = useState(true);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/connectStationsWithTimesOnJourneyId?stationNameA=${s.ticket.departure}&stationNameB=${s.ticket.arrival}`
      );

      setJourneys(await data.json());
      let holidayData = await fetch("/api/holidays");
      setHolidays(await holidayData.json());
    }
    fetchData();
  }, []);

  useEffect(() => {
    function weekdayCheck() {
      let day = new Date(s.ticket.date).getDay();
      let isHoliday = false;
      for (let i = 0; i < holidays.length; i++) {
        let holidayDate = new Date(holidays[i].date).toLocaleDateString(
          "sv-SE"
        );
        if (
          holidayDate === new Date(s.ticket.date).toLocaleDateString("sv-SE")
        ) {
          isHoliday = true;
          break;
        } else {
          isHoliday = false;
        }
      }

      if (isHoliday || day === 6 || day === 0) {
        setWeekday(false);
      } else {
        setWeekday(true);
      }
    }
    weekdayCheck(s.ticket.date);
  }, [s.ticket.date]);

  return (
    <>
      {!!weekday &&
        journeys.map((journey, index) => (
          <Journey
            key={index}
            {...{
              journey
            }}
          />
        ))}
      {!weekday &&
        journeys
          .filter(journey => journey.justOnWeekdays === 0)
          .map((journey, index) => (
            <Journey
              key={index}
              {...{
                journey
              }}
            />
          ))}
    </>
  );
}
export default JourneyList;
