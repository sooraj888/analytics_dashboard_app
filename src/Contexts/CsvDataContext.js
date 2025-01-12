import React, { createContext, useState, useEffect } from "react";
import Papa from "papaparse";

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
    ascendingOrder = "asc"
  ) => {
    const filteredData = jsonData.filter((item) => {
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

    sortData([...filteredData], keyValue, ascendingOrder);
  };

  const sortTableData = (keyValue, ascendingOrder = "asc") => {
    sortData([...tableData], keyValue, ascendingOrder);
  };

  const sortData = (data, keyValue, ascendingOrder = "asc") => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[keyValue] ?? "";
      const bValue = b[keyValue] ?? "";

      if (typeof aValue === "number" && typeof bValue === "number") {
        return ascendingOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
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
        const chatLimit = 15;
        Object.entries(groupedCounts).forEach(([key, value]) => {
          newValues[key] = createChartArray(key, value, chatLimit);
        });
        return newValues;
      });
      //
    }
  }, [jsonData]);
  //#endregion

  //#region Create Chart Array

  function createChartArray(key, data, size) {
    const totalCount = jsonData?.length;
    const sortedArray = Object.entries(data)
      .map(([name, count]) => ({
        name,
        [key]: count,
        percentage: ((count / totalCount) * 100).toFixed(2),
      }))
      .sort((a, b) => b[key] - a[key]);

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
