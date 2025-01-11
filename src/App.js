import "./App.css";
import React, { useContext } from "react";
import { CsvDataContext } from "./Contexts/CsvDataContext";

import ThemeContainer from "./Components/ThemeContainer";
import ThemeToggleButton from "./Components/ThemeToggleButton";
import ElectricVehiclePopulationTable from "./Components/ElectricVehiclePopulationTable";

function App() {
  const { jsonData, loading } = useContext(CsvDataContext);

  return (
    <div>
      <ThemeContainer>
        <h1>Electric Vehicle Analytics</h1>
        <ThemeToggleButton />
        {loading ? "loading" : "loaded"}
        <ElectricVehiclePopulationTable />
      </ThemeContainer>
    </div>
  );
}

export default App;
