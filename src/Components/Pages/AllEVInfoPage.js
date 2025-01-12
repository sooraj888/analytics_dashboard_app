import React, { useContext } from "react";
import ElectricVehiclePopulationTable from "../ElectricVehiclePopulationTable";
import { CsvDataContext } from "../../Contexts/CsvDataContext";
import Example from "../Chart/Example";
import MyPIieChart from "../Chart/MyPIieChart";

export default function AllEVInfoPage() {
  const { allEVChartData } = useContext(CsvDataContext);
  return (
    <div>
      <h1>Welcome to the All EV Vehicle Info Page</h1>
      <ElectricVehiclePopulationTable />
      <Example data={allEVChartData?.["Make"]} dataKey={"Make"} />
      <Example data={allEVChartData?.["City"]} dataKey={"City"} />
      <Example data={allEVChartData?.["Model"]} dataKey={"Model"} />
      <Example data={allEVChartData?.["Model Year"]} dataKey={"Model Year"} />

      <h3>Electric Vehicle Type</h3>
      <MyPIieChart
        data={allEVChartData?.["Electric Vehicle Type"]}
        dataKey={"Electric Vehicle Type"}
      />
      {console.log(allEVChartData)}
    </div>
  );
}
