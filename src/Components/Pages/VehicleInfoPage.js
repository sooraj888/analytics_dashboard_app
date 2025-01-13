import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./VehicleInfoPage.module.css";
import { CsvDataContext } from "../../Contexts/CsvDataContext";
import Example from "../Chart/Example";
import MyPIieChart from "../Chart/MyPIieChart";
export default function VehicleInfoPage() {
  const [inputValue, setInputValue] = useState("");
  const { jsonData, allEVChartData } = useContext(CsvDataContext);
  const [vehicleTotalDetails, setVehicleTotalDetails] = useState([]);
  const [vehicleTotalChartDetails, setVehicleTotalChartDetails] =
    useState(null);
  const handleSearch = (query) => {
    setVehicleTotalDetails(jsonData.filter((item) => item["Model"] == query));
    console.log(jsonData.filter((item) => item["Model"] == query));
    setInputValue("");
  };

  const getNames = (data) => {
    return data?.map((item) => item.name);
  };

  let suggestionsList = [];
  suggestionsList = getNames(
    allEVChartData != null ? allEVChartData?.["Model"] : []
  );

  useEffect(() => {
    if (vehicleTotalDetails != null) {
      const keysToExclude = ["DOL Vehicle ID"];
      const groupedCounts = {};
      const fullData = [...vehicleTotalDetails];
      fullData["DOL Vehicle ID"] = null;
      fullData.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (keysToExclude.includes(key)) {
            return; // Skip processing for excluded keys
          }
          if (!groupedCounts[key]) {
            groupedCounts[key] = {};
          }
          groupedCounts[key][value] = (groupedCounts[key][value] || 0) + 1;
        });
      });

      // setAllEVData(groupedCounts);

      //
      setVehicleTotalChartDetails((prev) => {
        const newValues = { ...prev };
        const chatLimit = {
          "VIN (1-10)": { limit: 15, sortDescending: true },
          County: { limit: 20, sortDescending: true },
          City: { limit: 20, sortDescending: true },
          State: { limit: 15, sortDescending: true },
          "Postal Code": { limit: 15, sortDescending: true },
          "Model Year": { limit: 15, sortDescending: false },
          Make: { limit: 20, sortDescending: true },
          Model: { limit: 20, sortDescending: true },
          "Electric Vehicle Type": { limit: 15, sortDescending: true },
          "Clean Alternative Fuel Vehicle (CAFV) Eligibility": {
            limit: 15,
            sortDescending: true,
          },
          "Electric Range": { limit: 15, sortDescending: true },
          "Base MSRP": { limit: 15, sortDescending: true },
          "Legislative District": { limit: 15, sortDescending: true },
          "DOL Vehicle ID": { limit: 15, sortDescending: true },
          "Vehicle Location": { limit: 15, sortDescending: true },
          "Electric Utility": { limit: 15, sortDescending: true },
          "2020 Census Tract": { limit: 15, sortDescending: true },
        };
        Object.entries(groupedCounts).forEach(([key, value]) => {
          newValues[key] = createChartArray(
            key,
            value,
            chatLimit[key]?.limit || 15,
            chatLimit[key]?.sortDescending,
            jsonData?.length
          );
        });
        return newValues;
      });
      //
    }
  }, [vehicleTotalDetails]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Welcome to the VehicleInfo Page</h1>
      <SearchBoxWithSmallButtons
        suggestionsList={suggestionsList}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
      />
      <h1
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
          fontSize: "1.5rem",
        }}
      >
        <span>Model Name: {vehicleTotalDetails?.[0]?.["Model"]}</span>
      </h1>
      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Electric Vehicle Model Year
      </h3>
      <Example
        data={vehicleTotalChartDetails?.["Model Year"]}
        dataKey={"Model Year"}
      />

      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Electric Vehicles In Cities
      </h3>
      <Example data={vehicleTotalChartDetails?.["City"]} dataKey={"City"} />

      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Electric Range
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MyPIieChart
          data={vehicleTotalChartDetails?.["Electric Range"]}
          dataKey={"Electric Range"}
        />
      </div>
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
    if (onSearch) {
      onSearch(suggestion);
    }
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
        style={{
          backgroundColor: "white",
        }}
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

export function createChartArray(key, data, size, sortDescending, totalCount) {
  let sortedArray = Object.entries(data).map(([name, count]) => ({
    name,
    [key]: count,
    percentage: ((count / totalCount) * 100).toFixed(2),
  }));

  if (sortDescending) {
    sortedArray = sortedArray.sort((a, b) => b[key] - a[key]);

    if (sortedArray.length <= size) {
      return sortedArray;
    }

    const topElements = sortedArray.slice(0, size - 1);
    const otherElements = sortedArray.slice(size - 1);

    const otherCount = otherElements.reduce((sum, item) => sum + item[key], 0);
    const otherPercentage = ((otherCount / totalCount) * 100).toFixed(2);

    topElements.push({
      name: "Other",
      [key]: otherCount,
      percentage: otherPercentage,
    });
    return topElements;
  }

  return sortedArray;
}
