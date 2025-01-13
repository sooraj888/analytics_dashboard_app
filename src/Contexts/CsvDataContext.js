import React, { createContext, useState, useEffect } from "react";
import Papa from "papaparse";
import { createChartArray } from "../Components/Pages/VehicleInfoPage";

export const CsvDataContext = createContext();

export const CsvDataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [tableData, setTableData] = useState(null);

  const [allEVData, setAllEVData] = useState(null);

  const [allEVChartData, setAllEVChartData] = useState(null);

  useEffect(() => {
    fetch("/Electric_Vehicle_Population_Data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            setJsonData(result.data);
            setTableData(result.data);
            setLoading(false);
          },
          header: true,
          skipEmptyLines: true,
        });
      })
      .catch((error) => {
        setJsonData({});
        console.error("Error reading CSV:", error);
        setLoading(false);
      });
  }, []);

  //#region Filtering the table
  const filterAndSortTableData = (
    filters = {},
    keyValue,
    ascendingOrder = "asc",
    isNumber
  ) => {
    const filteredData = jsonData?.filter((item) => {
      return Object.entries(filters).every(([filterKey, filterValue]) => {
        const itemValue = item[filterKey] ?? "";

        if (typeof filterValue == "object" && filterValue != null) {
          // Handle min and max filters for numeric values

          const { min, max } = filterValue;
          if (isStringNumber(itemValue)) {
            if (min != undefined && itemValue < min) return false;
            if (max != undefined && itemValue > max) return false;
          }
          return true;
        }
        // Default string matching
        return itemValue
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });
    if (filteredData != null) {
      sortData([...filteredData], keyValue, ascendingOrder, isNumber);
    }
  };

  const sortTableData = (
    keyValue,
    ascendingOrder = "asc",
    isNumber = false
  ) => {
    sortData([...tableData], keyValue, ascendingOrder, isNumber);
  };

  const sortData = (
    data,
    keyValue,
    ascendingOrder = "asc",
    isNumber = false
  ) => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[keyValue] ?? "";
      const bValue = b[keyValue] ?? "";

      if (isNumber) {
        return ascendingOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (!isNumber) {
        return ascendingOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return ascendingOrder === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });

    setTableData(sorted);
  };

  const isStringNumber = (value) => {
    if (typeof value !== "string") return false; // Ensure it's a string
    return !isNaN(value) && !isNaN(parseFloat(value));
  };
  //#endregion

  //#region Create Total Count Data
  useEffect(() => {
    if (jsonData != null) {
      const keysToExclude = ["DOL Vehicle ID"];
      const groupedCounts = {};
      const fullData = [...jsonData];
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

      setAllEVData(groupedCounts);

      //
      setAllEVChartData((prev) => {
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
  }, [jsonData]);
  //#endregion

  return (
    <CsvDataContext.Provider
      value={{
        jsonData,
        loading,
        tableData,
        allEVChartData,
        sortTableData,
        filterAndSortTableData,
      }}
    >
      {children}
    </CsvDataContext.Provider>
  );
};
