import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeTrip from "./pages/CustomizeTrip";
import PickJourney from "./pages/PickJourney";
import Ticket from "./pages/Ticket";
import Login from "./pages/Login"
import styles from "../public/css/commonStyles.css"; // Common styling for all pages
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valj-resa" />
          <Route path="/valj-tag" element={<PickJourney />} />
          <Route path="/anpassa-resa" element={<CustomizeTrip />} />
          <Route path="/kassan" />
          <Route path="/mina-biljetter" element={<Ticket />} />
          <Route path="/logga-in" element={<Login />} />
          <Route path="/kontakta-oss" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
