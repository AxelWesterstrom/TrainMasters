import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizeTrip from "./pages/CustomizeTrip";
import PickJourney from "./pages/PickJourney";
import Ticket from "./pages/Ticket";


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/valj-resa' /> //we have route path in swedish like SJ's
          website
          <Route path='/valj-tag' element={<PickJourney />} /> //There is a
          header component and we can use it for all other pages
          <Route path='/anpassa-resa' />
          <Route path='/kassan' />
          <Route path='/mina-biljetter' element={<Ticket />} />
          <Route path='/valj-tag' element={<PickJourney />} /> //There is a
          header component and we can use it for all other pages
           <Route path="/anpassa-resa" element={<CustomizeTrip />} />
          <Route path='/kassan' />
          <Route path='/mina-biljetter' element={<Ticket />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
