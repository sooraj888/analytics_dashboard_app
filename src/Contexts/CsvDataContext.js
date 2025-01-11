import React, { createContext, useState, useEffect } from "react";
import Papa from "papaparse";

export const CsvDataContext = createContext();

export const CsvDataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Electric_Vehicle_Population_Data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            setJsonData(result.data);
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

  return (
    <CsvDataContext.Provider value={{ jsonData, loading }}>
      {children}
    </CsvDataContext.Provider>
  );
};
