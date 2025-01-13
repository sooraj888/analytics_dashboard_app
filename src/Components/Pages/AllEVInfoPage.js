import React, { useContext } from "react";

import Example from "../Chart/Example";
import MyPIieChart from "../Chart/MyPIieChart";
import ElectricVehiclePopulationTable from "../ElectricVehiclePopulationTable";
import { CsvDataContext } from "../../Contexts/CsvDataContext";
import styles from "./AllEVInfoPage.module.css";

export default function AllEVInfoPage() {
  const { allEVChartData } = useContext(CsvDataContext);
  return (
    <>
      <div className={styles.AllEvInfoContainer}>
        <h2>Explore All Electric Vehicle Information</h2>
        <ElectricVehiclePopulationTable />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
          Electric Vehicles Maker
        </h3>
        <Example data={allEVChartData?.["Make"]} dataKey={"Make"} />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
          Electric Vehicle Model Year
        </h3>
        <Example data={allEVChartData?.["Model Year"]} dataKey={"Model Year"} />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
          Electric Vehicles In Cities
        </h3>
        <Example data={allEVChartData?.["City"]} dataKey={"City"} />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
          Electric Vehicles Models
        </h3>
        <Example data={allEVChartData?.["Model"]} dataKey={"Model"} />

        <div className={styles["custom-line"]} />
        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
          Electric Vehicle Type
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyPIieChart
            data={allEVChartData?.["Electric Vehicle Type"]}
            dataKey={"Electric Vehicle Type"}
          />
        </div>

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
            data={allEVChartData?.["Electric Range"]}
            dataKey={"Electric Range"}
          />
        </div>
        {console.log(allEVChartData)}
      </div>
    </>
  );
}
