import Header from "../components/Header";
import React from "react";
import SearchBar from "../components/SearchBar";
import styles from "../../public/css/home.css";
import { react, useState, useEffect } from "react";
import { useStates } from "../assets/helpers/states";
import { useNavigate } from "react-router-dom";

function Home() {
  const [stations, setStations] = useState([]);
  let u = useStates("user");
  let s = useStates("booking");

  if (u.showMessage && window.timeoutsInPlay && window.timeoutsInPlay !== u.showMessage) {
    // you were fast we are still showing the last message but ok
    clearTimeout(window.ongoingTimeout);
    window.timeoutsInPlay = false;
  }

  if (u.showMessage && !window.timeoutsInPlay) {
    window.timeoutsInPlay = u.showMessage
    window.ongoingTimeout = setTimeout(() => {
      u.fadeMessage = true;
      window.ongoingTimeout = setTimeout(() => {
        delete u.showMessage;
        delete u.fadeMessage;
        delete window.timeoutsInPlay;
      }, 1500);
    }, 3000);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/stations") //Fetch station table from database
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => {
          setStations(jsonRes);
        });
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="home">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <SearchBar stations={stations} />
          {u.showMessage !== 'login' ? null : <div className={'login-popup' + (u.fadeMessage ? ' fade' : '')}>
            Du är nu inloggad som {u.email}
          </div>}
          {u.showMessage !== 'register' ? null : <div className={'login-popup' + (u.fadeMessage ? ' fade' : '')}>
            Ditt nya konto har skapats med email: {u.email}
          </div>}
          {u.showMessage !== 'logout' ? null : <div className={'login-popup' + (u.fadeMessage ? ' fade' : '')}>
            Du är nu utloggad
          </div>}
        </div>
      </div>
    </>
  );
}
export default Home;