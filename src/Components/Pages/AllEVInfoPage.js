import React, { useContext } from "react";

import Example from "../Chart/Example";
import MyPIieChart from "../Chart/MyPIieChart";
import ElectricVehiclePopulationTable from "../ElectricVehiclePopulationTable";
import { CsvDataContext } from "../../Contexts/CsvDataContext";
import styles from "./AllEVInfoPage.module.css";

export default function AllEVInfoPage() {
  const { allEVChartData } = useContext(CsvDataContext);
  return (
    <div className={styles.AllEvInfoContainer}>
      <h2>Explore All Electric Vehicle Information</h2>
      <ElectricVehiclePopulationTable />
      {/* <Example data={allEVChartData?.["Make"]} dataKey={"Make"} /> */}
      <h3>Electric Vehicle Maker</h3>
      {/* <Example data={allEVChartData?.["City"]} dataKey={"City"} /> */}
      <h3>Electric Vehicle In Cities</h3>
      {/* <Example data={allEVChartData?.["Model"]} dataKey={"Model"} /> */}
      <h3>Electric Vehicle Models</h3>
      {/* <Example data={allEVChartData?.["Model Year"]} dataKey={"Model Year"} /> */}
      <h3>Electric Vehicle Model Year</h3>
      <div className={styles["custom-line"]} />
      <h3>Electric Vehicle Type</h3>
      {/* <MyPIieChart
        data={allEVChartData?.["Electric Vehicle Type"]}
        dataKey={"Electric Vehicle Type"}
      /> */}
      <h3>Electric Range</h3>
      {/* <MyPIieChart
        data={allEVChartData?.["Electric Range"]}
        dataKey={"Electric Range"}
      /> */}
      {console.log(allEVChartData)}
    </div>
  );
}
