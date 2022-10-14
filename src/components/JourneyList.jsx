import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import "../../public/css/journey.css";
import { useStates } from "../assets/helpers/states";

function JourneyList() {
  let s = useStates("booking");
  let l = useStates({
    holidays: [],
    weekday: true,
    journeys: []
  });

  useEffect(() => {
    (async () => {
      console.log("Fetching l.journeys in journeyList");
      l.journeys = await (
        await fetch(
          `/api/connectStationsWithTimesOnJourneyId?stationNameA=${s.ticket.departure}&stationNameB=${s.ticket.arrival}`
        )
      ).json();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      l.holidays = await (await fetch("/api/holidays")).json();
    })();
  }, []);

  useEffect(() => {
    function weekdayCheck() {
      let day = new Date(s.ticket.date).getDay();
      let isHoliday = false;
      for (let i = 0; i < l.holidays.length; i++) {
        let holidayDate = new Date(l.holidays[i].date).toLocaleDateString(
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
        l.weekday = false;
      } else {
        l.weekday = true;
      }
    }
    weekdayCheck(s.ticket.date);
  }, [s.ticket.date]);

  function sortTime(a, b) {
    let timeA = a.departureTimeA;
    let timeB = b.departureTimeB;
    if (timeA < timeB) {
      return -1;
    }
    if (timeA > timeB) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      {!!l.weekday &&
        [...l.journeys].sort(sortTime).map((journey, index) => (
          <Journey
            key={index}
            {...{
              journey
            }}
          />
        ))}
      {!l.weekday &&
        l.journeys
          .filter(journey => journey.justOnWeekdays === 0)
          .sort(sortTime)
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
