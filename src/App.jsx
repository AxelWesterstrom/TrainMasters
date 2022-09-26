import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeTrip from "./pages/CustomizeTrip";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valj-resa" /> //we have route path in swedish like SJ's
          website
          <Route path="/valj-tag" /> //There is a header component and we can
          use it for all other pages
          <Route path="/anpassa-resa" element={<CustomizeTrip />} />
          <Route path="/kassan" />
          <Route path="/mina-biljetter" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
