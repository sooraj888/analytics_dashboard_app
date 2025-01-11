import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { CsvDataContext } from "../Contexts/CsvDataContext";

var contentWidth = 180;

const ElectricVehiclePopulationTable = () => {
  const { jsonData, loading } = useContext(CsvDataContext);
  const scrollRef = useRef();
  const scrollBarRef = useRef();
  const rowGetter = ({ index }) => jsonData[index];

  return (
    <div style={{ padding: "10px" }}>
      {jsonData?.length && (
        <Table
          ref={scrollRef}
          className="hide-vertical-scrollbar"
          height={400}
          width={17 * contentWidth}
          headerHeight={40}
          rowHeight={30}
          rowCount={jsonData?.length}
          rowGetter={rowGetter}
          style={{
            margin: "20px auto",
            border: "1px solid #ddd",
            width: "100%",
            overflowX: "auto",
          }}
          onScroll={(event) => {
            if (scrollRef.current) {
              let valueff =
                (event.scrollTop / (event.scrollHeight - event.clientHeight)) *
                100;
              scrollBarRef.current.value = parseInt(valueff);
            }
          }}
        >
          <Column
            label="Index"
            dataKey="index"
            width={contentWidth}
            cellRenderer={({ rowIndex }) => rowIndex + 1} // 1-based index
          />
          <Column
            label="VIN (1-10)"
            dataKey="VIN (1-10)"
            width={contentWidth}
            // cellRenderer={({ rowIndex }) => {
            //   return <span style={{ color: "red" }}>{rowIndex + 1}</span>;
            // }}
            // headerRenderer={({ label }) => {
            //   return (
            //     <span style={{ color: "blue", fontWeight: "bold" }}>
            //       {label}
            //     </span>
            //   );
            // }}
          />

          <Column label="County" dataKey="County" width={contentWidth} />
          <Column label="City" dataKey="City" width={contentWidth} />
          <Column label="State" dataKey="State" width={contentWidth} />
          <Column
            label="Postal Code"
            dataKey="Postal Code"
            width={contentWidth}
          />
          <Column
            label="Model Year"
            dataKey="Model Year"
            width={contentWidth}
          />
          <Column label="Make" dataKey="Make" width={contentWidth} />
          <Column label="Model" dataKey="Model" width={contentWidth} />
          <Column
            label="Electric Vehicle Type"
            dataKey="Electric Vehicle Type"
            width={contentWidth}
          />
          <Column
            label="CAFV Eligibility"
            dataKey="Clean Alternative Fuel Vehicle (CAFV) Eligibility"
            width={contentWidth}
          />
          <Column
            label="Electric Range"
            dataKey="Electric Range"
            width={contentWidth}
          />
          <Column label="Base MSRP" dataKey="Base MSRP" width={contentWidth} />
          <Column
            label="Legislative District"
            dataKey="Legislative District"
            width={contentWidth}
          />
          <Column
            label="DOL Vehicle ID"
            dataKey="DOL Vehicle ID"
            width={contentWidth}
          />
          <Column
            label="Vehicle Location"
            dataKey="Vehicle Location"
            width={contentWidth}
          />
          <Column
            label="Electric Utility"
            dataKey="Electric Utility"
            width={contentWidth}
          />
          <Column
            label="2020 Census Tract"
            dataKey="2020 Census Tract"
            width={contentWidth}
          />
        </Table>
      )}

      <input
        className="vertical-slider"
        type="range"
        style={{
          width: "400px",
          // height: "500px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          border: "2px solid #000",
          position: "relative",
          marginBottom: "10px",
          transform: "rotate(90deg)",
          position: "absolute",
          right: -190,
          top: 300,
        }}
        color="red"
        defaultValue={0}
        ref={scrollBarRef}
        onChange={(e) => {
          scrollRef.current.scrollToRow(
            Math.max(
              0,
              Math.min(
                Math.floor((e.target?.value / 100) * jsonData?.length),
                jsonData?.length - 1
              )
            )
          );
        }}
      />
    </div>
  );
};

export default ElectricVehiclePopulationTable;
