import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./VehicleInfoPage.module.css";
import { CsvDataContext } from "../../Contexts/CsvDataContext";
import { createChartArray, SearchBoxWithSmallButtons } from "./VehicleInfoPage";
import MyPIieChart from "../Chart/MyPIieChart";
import Example from "../Chart/Example";

export default function MakersInfoPage() {
  const [inputValue, setInputValue] = useState("");
  const { jsonData, allEVChartData } = useContext(CsvDataContext);
  const [vehicleTotalDetails, setVehicleTotalDetails] = useState([]);
  const [vehicleTotalChartDetails, setVehicleTotalChartDetails] =
    useState(null);
  const handleSearch = (query) => {
    setVehicleTotalDetails(jsonData.filter((item) => item["Make"] == query));
    setInputValue("");
  };

  const getNames = (data) => {
    return data?.map((item) => item.name);
  };

  let suggestionsList = [];
  suggestionsList = getNames(
    allEVChartData != null ? allEVChartData?.["Make"] : []
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
        <span>Maker Company Name: {vehicleTotalDetails?.[0]?.["Make"]}</span>
      </h1>
      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Electric Vehicle Model Year
      </h3>
      <Example
        data={vehicleTotalChartDetails?.["Model Year"]}
        dataKey={"Model Year"}
      />

      <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Electric Vehicles Models
      </h3>
      <Example data={vehicleTotalChartDetails?.["Model"]} dataKey={"Model"} />

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
