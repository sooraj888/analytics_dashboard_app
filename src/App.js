import "./App.css";
import Papa from "papaparse";
import React, { useContext } from "react";
import { CsvDataContext } from "./Contexts/CsvDataContext";

import ThemeContainer from "./Components/ThemeContainer";
import ThemeToggleButton from "./Components/ThemeToggleButton";

function App() {
  const { jsonData, loading } = useContext(CsvDataContext);
  return (
    <div>
      <ThemeContainer>
        <ThemeToggleButton />
        <h1>Electric Vehicle Population Data</h1>
        {loading ? "loading" : "loaded"}
      </ThemeContainer>
    </div>
  );
}

export default App;
