import React, { useContext } from "react";
import ElectricVehiclePopulationTable from "../ElectricVehiclePopulationTable";
import { CsvDataContext } from "../../Contexts/CsvDataContext";

export default function AllEVInfoPage() {
  const { allEVChartData } = useContext(CsvDataContext);
  return (
    <div>
      <h1>Welcome to the All EV Vehicle Info Page</h1>
      <ElectricVehiclePopulationTable />

      {JSON.stringify(allEVChartData)}
    </div>
  );
}
