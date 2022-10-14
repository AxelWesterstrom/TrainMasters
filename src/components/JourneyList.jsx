import React from "react";
import { useState, useEffect } from "react";
import Journey from "./Journey";
import "../../public/css/journey.css";
import { useStates } from "../assets/helpers/states";

function JourneyList() {
  let s = useStates("booking");
  let l = useStates({
    journeys: [],
    weekday: true,
    holidays: []
  });

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `/api/connectStationsWithTimesOnJourneyId?stationNameA=${s.ticket.departure}&stationNameB=${s.ticket.arrival}`
      );

      l.journeys = await data.json();
      let holidayData = await fetch("/api/holidays");
      l.holidays = await holidayData.json();
    }
    fetchData();
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

  return (
    <>
      {!!l.weekday &&
        l.journeys.map((journey, index) => (
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
