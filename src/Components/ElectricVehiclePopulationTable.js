import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { CsvDataContext } from "../Contexts/CsvDataContext";

var contentWidth = 180;

const ElectricVehiclePopulationTable = () => {
  const { tableData, loading } = useContext(CsvDataContext);
  const scrollRef = useRef();
  const scrollBarRef = useRef();
  const rowGetter = ({ index }) => tableData[index];

  return (
    <div style={{ padding: "10px" }}>
      {tableData?.length && (
        <Table
          ref={scrollRef}
          className="hide-vertical-scrollbar"
          height={400}
          width={17 * contentWidth}
          headerHeight={40}
          rowHeight={30}
          rowCount={tableData?.length}
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
            cellRenderer={({ rowIndex }) => rowIndex + 1}
          />
          <Column
            label="VIN (1-10)"
            dataKey="VIN (1-10)"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
            // cellRenderer={({ rowIndex }) => {
            //   return <span style={{ color: "red" }}>{rowIndex + 1}</span>;
            // }}
          />

          <Column
            label="County"
            dataKey="County"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="City"
            dataKey="City"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="State"
            dataKey="State"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Postal Code"
            dataKey="Postal Code"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Model Year"
            dataKey="Model Year"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Make"
            dataKey="Make"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Model"
            dataKey="Model"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Electric Vehicle Type"
            dataKey="Electric Vehicle Type"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="CAFV Eligibility"
            dataKey="Clean Alternative Fuel Vehicle (CAFV) Eligibility"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return (
                <ColumnHeader
                  keyValue={"Clean Alternative Fuel Vehicle (CAFV) Eligibility"}
                  label={label}
                />
              );
            }}
          />
          <Column
            label="Electric Range"
            dataKey="Electric Range"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Base MSRP"
            dataKey="Base MSRP"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Legislative District"
            dataKey="Legislative District"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="DOL Vehicle ID"
            dataKey="DOL Vehicle ID"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Vehicle Location"
            dataKey="Vehicle Location"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="Electric Utility"
            dataKey="Electric Utility"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
          />
          <Column
            label="2020 Census Tract"
            dataKey="2020 Census Tract"
            width={contentWidth}
            headerRenderer={({ label }) => {
              return <ColumnHeader keyValue={label} label={label} />;
            }}
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
                Math.floor((e.target?.value / 100) * tableData?.length),
                tableData?.length - 1
              )
            )
          );
        }}
      />
    </div>
  );
};

export default ElectricVehiclePopulationTable;

const ColumnHeader = ({ keyValue = "", label }) => {
  const { sortTableData, filterAndSortTableData } = useContext(CsvDataContext);
  return (
    <>
      <span
        onClick={() => {
          filterAndSortTableData(
            {
              // "VIN (1-10)": "1C4JJXN60P",
              County: "Snohomish",
              // City: "Washougal",
              // State: "WA",
              // "Postal Code": { min: 0, max: 99999031 },
              "Model Year": { min: 2015, max: 2015 },
              // Make: "JEEP",
              // Model: "WRANGLER",
              // "Electric Vehicle Type": "Plug-in Hybrid Electric Vehicle (PHEV)",
              // "Clean Alternative Fuel Vehicle (CAFV) Eligibility":
              //   "Not eligible due to low battery range",
              // "Electric Range": "21",
              // "Base MSRP": "0",
              // "Legislative District": "18",
              // "DOL Vehicle ID": "227539357",
              // "Vehicle Location": "POINT (-122.35465 45.58359)",
              // "Electric Utility":
              //   "BONNEVILLE POWER ADMINISTRATION||PUD NO 1 OF CLARK COUNTY - (WA)",
              // "2020 Census Tract": "53011040512",
            },
            keyValue,
            "asc"
          );
        }}
      >
        b
      </span>
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <span
        onClick={() => {
          sortTableData(keyValue, "desc");
        }}
      >
        b
      </span>
    </>
  );
};
