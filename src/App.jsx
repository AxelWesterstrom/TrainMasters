import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Picker from "./pages/Picker.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeTrip from "./pages/CustomizeTrip.jsx";
import PickJourney from "./pages/PickJourney.jsx";
import Ticket from "./pages/Ticket.jsx";

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
