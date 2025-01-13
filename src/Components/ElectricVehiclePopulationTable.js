import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { CsvDataContext } from "../Contexts/CsvDataContext";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from "react-icons/fa";
import styles from "./ElectricVehiclePopulationTable.module.css";
import FloatingToolMenu from "./FloatingToolMenu";
import { Button } from "@mui/material";
import { IoIosWarning } from "react-icons/io";

var contentWidth = 180;

const ElectricVehiclePopulationTable = () => {
  const { tableData, filterAndSortTableData, loading } =
    useContext(CsvDataContext);

  const rowGetter = ({ index }) => tableData[index];
  const [filterObject, setFilterObject] = useState({});

  const ClearFilter = () => {
    setFilterObject({});
  };

  useEffect(() => {
    filterAndSortTableData(filterObject);
  }, [filterObject]);

  return (
    <div
      style={{
        padding: "10px",
        paddingBottom: "2px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        style={{ width: 200 }}
        onClick={() => {
          ClearFilter();
        }}
      >
        Clear Filter
      </Button>

      {tableData?.length > 0
        ? (() => {
            return (
              <>
                {tableData?.length && (
                  <Table
                    height={300}
                    width={17 * contentWidth}
                    headerHeight={40}
                    rowHeight={30}
                    rowCount={tableData?.length}
                    rowGetter={rowGetter}
                    style={{
                      margin: "10px auto",
                      border: "1px solid #ddd",
                      width: "100%",
                      overflowX: "auto",
                    }}
                  >
                    <Column
                      label="Index"
                      dataKey="index"
                      width={contentWidth}
                      cellRenderer={({ rowIndex }) => (
                        <IndexCellRenderer index={rowIndex + 1} />
                      )}
                    />
                    <Column
                      label="VIN (1-10)"
                      dataKey="VIN (1-10)"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />

                    <Column
                      label="County"
                      dataKey="County"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="City"
                      dataKey="City"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="State"
                      dataKey="State"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Postal Code"
                      dataKey="Postal Code"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Model Year"
                      dataKey="Model Year"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Make"
                      dataKey="Make"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Model"
                      dataKey="Model"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Electric Vehicle Type"
                      dataKey="Electric Vehicle Type"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                          fontsize={"0.8rem"}
                        />
                      )}
                    />
                    <Column
                      label="CAFV Eligibility"
                      dataKey="Clean Alternative Fuel Vehicle (CAFV) Eligibility"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={
                              "Clean Alternative Fuel Vehicle (CAFV) Eligibility"
                            }
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                          fontsize={"0.8rem"}
                        />
                      )}
                    />
                    <Column
                      label="Electric Range"
                      dataKey="Electric Range"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Base MSRP"
                      dataKey="Base MSRP"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Legislative District"
                      dataKey="Legislative District"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="DOL Vehicle ID"
                      dataKey="DOL Vehicle ID"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                    <Column
                      label="Vehicle Location"
                      dataKey="Vehicle Location"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                          fontsize={"0.8rem"}
                        />
                      )}
                    />
                    <Column
                      label="Electric Utility"
                      dataKey="Electric Utility"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                          fontsize={"0.8rem"}
                        />
                      )}
                    />
                    <Column
                      label="2020 Census Tract"
                      dataKey="2020 Census Tract"
                      width={contentWidth}
                      headerRenderer={({ label }) => {
                        return (
                          <ColumnHeader
                            keyValue={label}
                            label={label}
                            isNumber={true}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                          />
                        );
                      }}
                      cellRenderer={({ cellData, rowData }) => (
                        <CustomCellRenderer
                          cellData={cellData}
                          rowData={rowData}
                        />
                      )}
                    />
                  </Table>
                )}
              </>
            );
          })()
        : !loading && (
            <div
              style={{
                color: "red",
                padding: "100px 0px",
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
              }}
              onClick={() => {
                ClearFilter();
              }}
            >
              <IoIosWarning color="yellow" style={{ margin: "10px" }} />
              Filtered data Not Found Clear The Filter
            </div>
          )}
    </div>
  );
};

export default ElectricVehiclePopulationTable;

const ColumnHeader = ({
  keyValue = "",
  label,
  isNumber,
  filterObject,
  setFilterObject,
}) => {
  const { sortTableData } = useContext(CsvDataContext);

  return (
    <div className={styles["column-header"]}>
      <span
        className="sort-icon"
        onClick={() => sortTableData(keyValue, "asc", isNumber)}
      >
        {isNumber ? <FaSortAmountDownAlt /> : <FaSortAlphaDown />}
      </span>
      <span className="label">
        <FloatingToolMenu
          name={label}
          isNumber={isNumber}
          filterObject={filterObject}
          setFilterObject={setFilterObject}
        />
      </span>
      <span
        className="sort-icon"
        onClick={() => sortTableData(keyValue, "desc", isNumber)}
      >
        {isNumber ? <FaSortAmountUp /> : <FaSortAlphaDownAlt />}
      </span>
    </div>
  );
};

const CustomCellRenderer = ({ cellData, rowData, fontsize }) => {
  return (
    <div
      style={{
        paddingLeft: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        // borderRight: "1px solid #ddd", // Right border for the column
        // borderBottom: "1px solid gray",
      }}
    >
      <span style={{ textAlign: "left", fontSize: fontsize }}>{cellData}</span>
    </div>
  );
};

const IndexCellRenderer = ({ index }) => {
  return (
    <div
      style={{
        paddingLeft: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        // borderRight: "1px solid #ddd", // Right border for the column
        // borderBottom: "1px solid gray",
      }}
    >
      <span style={{ textAlign: "left" }}>{index}</span>
    </div>
  );
};
