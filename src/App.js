import "./App.css";
import React, { useContext } from "react";
import { CsvDataContext } from "./Contexts/CsvDataContext";

import ThemeContainer from "./Components/ThemeContainer";
import ThemeToggleButton from "./Components/ThemeToggleButton";
import { Routes, Route, Link } from "react-router-dom";
import {
  AllEVInfoPage,
  MakersInfoPage,
  VehicleInfoPage,
} from "./Components/Pages";

function App() {
  return (
    <ThemeContainer>
      <h1>Electric Vehicle Analytics</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">All EV Analytics</Link>
          </li>
          <li>
            <Link to="/evdetails">EV Details</Link>
          </li>
          <li>
            <Link to="/evmakerdetails">EV Maker Details</Link>
          </li>
        </ul>
      </nav>
      <ThemeToggleButton />
      <Routes>
        <Route path="/" element={<AllEVInfoPage />} />
        <Route path="/evdetails" element={<VehicleInfoPage />} />
        <Route path="/evmakerdetails" element={<MakersInfoPage />} />
      </Routes>
    </ThemeContainer>
  );
}

export default App;
