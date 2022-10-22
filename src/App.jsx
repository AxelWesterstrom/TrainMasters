import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Picker from "./pages/Picker.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeTrip from "./pages/CustomizeTrip";
import PickJourney from "./pages/PickJourney";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import Login from "./pages/Login";
import styles from "../public/css/commonStyles.css"; // Common styling for all pages
import Contact from "./pages/Contact";
import { useStates } from "./assets/helpers/states";
import { useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import ShowTicket from "./pages/ShowTicket";

const travelerTypes = [
  "Vuxen",
  "Ungdom (16-25 år)",
  "Barn (0-15 år)",
  "Student",
  "Pensionär",
];

function App() {
  let newDate = new Date();
  let s = useStates("booking", {
    ticket: {
      departure: "",
      arrival: "",
      date: newDate.getTime(),
      passengers: travelerTypes.map((type) => {
        return { travelerType: type, count: 0 };
      }),
      chosenJourney: {},
      carriageClass: 0,
      seats: [],
      type: "", // type is for cancelable or notCancelable
      secondClassPrice: 0,
      firstClassPrice: 0,
      totalPrice: 0, //final price for all tickets
      bookingNumber: 0,
      people: [], // {firstName, lastName, type}
      email: "",
    },
    autoSuggestStations: [],
  });

  let log = useStates("login", {
    login: false
  });

  let u = useStates("user", {
    email: "",
    customerId: 0,
    bookingNumber: 0,
  });

  let t = useStates("bookingNumber", {
    date: "",
    departureStation: "",
    departureTime: "",
    arrivalStation: "",
    arrivalTime: "",
    carriageNumber: [],
    seatNumber: [],
    price: 0,
    trainNumber: "",
    bookingNumber: 0,
    person: []
  })

  // useEffect(() => {
  //   (async () => {
  //     s.stations = await (await fetch("/api/stations")).json()
  //   })()
  // }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/valj-resa' element={<Picker />} />
          <Route path='/valj-tag' element={<PickJourney />} />
          <Route path='/anpassa-resa' element={<CustomizeTrip />} />
          <Route path='/kassan' element={<Payment />} />
          <Route path='/mina-biljetter' element={<Ticket />} />
          <Route path='/logga-in' element={<Login />} />
          <Route path='/skapa-konto' element={<RegisterForm />} />
          <Route path='/kontakta-oss' element={<Contact />} />
          <Route path='/biljetter' element={<ShowTicket />} onLeave={() => { console.log("CLEAR!"); }} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;