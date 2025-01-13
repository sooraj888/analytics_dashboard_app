import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./VehicleInfoPage.module.css";
import { CsvDataContext } from "../../Contexts/CsvDataContext";

export default function VehicleInfoPage() {
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
    allEVChartData != null ? allEVChartData?.["Model"] : []
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
      {JSON.stringify(allEVChartData?.["Model"])}
    </div>
  );
}

export const SearchBoxWithSmallButtons = ({
  suggestionsList,
  inputValue,
  setInputValue,
  onSearch,
}) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue); // Trigger the callback with the input value
    }
  };

  return (
    <div className={styles.searchBoxContainer}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.textField}
      />
      <div className={styles.buttonGrid}>
        {suggestionsList.map((suggestion, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleSuggestionClick(suggestion)}
            className={styles.suggestionButton}
            style={{
              backgroundColor:
                inputValue &&
                suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
                  ? "lightblue"
                  : "white",
            }}
          >
            {suggestion}
          </Button>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick} // Trigger parent callback on search click
        className={styles.searchButton}
      >
        Search
      </Button>
    </div>
  );
};
