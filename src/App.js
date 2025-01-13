import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  AllEVInfoPage,
  MakersInfoPage,
  VehicleInfoPage,
} from "./Components/Pages";
import ThemeContainer from "./Components/ThemeContainer";
import Header from "./Components/Header";

function App() {
  return (
    <ThemeContainer>
      <Header />
      <Routes>
        <Route path="/" element={<AllEVInfoPage />} />
        <Route path="/ev-details" element={<VehicleInfoPage />} />
        <Route path="/ev-maker-details" element={<MakersInfoPage />} />
      </Routes>
    </ThemeContainer>
  );
}

export default App;
