import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./VehicleInfoPage.module.css";
import { CsvDataContext } from "../../Contexts/CsvDataContext";
import { SearchBoxWithSmallButtons } from "./VehicleInfoPage";

export default function MakersInfoPage() {
  const [inputValue, setInputValue] = useState("");
  const { jsonData, allEVChartData } = useContext(CsvDataContext);

  const handleSearch = (query) => {
    alert(`Parent handling search for: ${query}`);
    setInputValue(""); // Clear the input after search if needed
  };

  const getNames = (data) => {
    return data?.map((item) => item.name);
  };

  let suggestionsList = [];
  suggestionsList = getNames(
    allEVChartData != null ? allEVChartData?.["Make"] : []
  );

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Welcome to the VehicleInfo Page</h1>
      <SearchBoxWithSmallButtons
        suggestionsList={suggestionsList}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch} // Pass the search handler as a prop
      />
      {JSON.stringify(allEVChartData?.["Make"])}
    </div>
  );
}
