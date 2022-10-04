import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Picker from "./pages/Picker.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeTrip from "./pages/CustomizeTrip";
import PickJourney from "./pages/PickJourney";
import Ticket from "./pages/Ticket";
import styles from "../public/css/commonStyles.css"; // Common styling for all pages

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valj-resa" element={<Picker />} />
          <Route path="/valj-tag" element={<PickJourney />} />
          <Route path="/anpassa-resa" element={<CustomizeTrip />} />
          <Route path="/kassan" />
          <Route path="/mina-biljetter" element={<Ticket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
