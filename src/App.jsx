import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valj-resa" />
          <Route path="/valj-tag" />
          <Route path="/anpassa-resa" />
          <Route path="/kassan" />
          <Route path="/mina-biljetter" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
