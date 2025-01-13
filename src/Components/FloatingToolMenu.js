import { Popover, Button, Box, Input, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CsvDataContext } from "../Contexts/CsvDataContext";

const FloatingToolMenu = ({
  name,
  isNumber,
  filterObject,
  setFilterObject,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [minValue, setMinValue] = useState(
    isNumber ? filterObject?.[name]?.min : ""
  );
  const [maxValue, setMaxValue] = useState(
    isNumber ? filterObject?.[name]?.max : ""
  );
  const [searchValue, setSearchValue] = useState(
    isNumber ? "" : filterObject[name]
  );

  const { filterAndSortTableData } = useContext(CsvDataContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMinValue("");
    setMaxValue("");
    setSearchValue("");
  };

  const handleSearch = () => {
    if (isNumber) {
      setFilterObject((prev) => {
        const newObj = { ...prev };
        if (name != null) {
          newObj[name] = { min: minValue, max: maxValue };
        }
        return newObj;
      });
    } else {
      if (name != null) {
        setFilterObject((prev) => {
          const newObj = { ...prev };
          if (name != null) {
            newObj[name] = searchValue;
          }
          return newObj;
        });
      }
    }
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <div
        onClick={handleClick}
        style={{ padding: "10px 3px", cursor: "pointer" }}
      >
        {name}
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Conditional rendering for inputs */}
          {isNumber ? (
            <>
              <Typography variant="subtitle2">Min Value</Typography>
              <Input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                placeholder="Enter min value"
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle2">Max Value</Typography>
              <Input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                placeholder="Enter max value"
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle2">Search</Typography>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter search term"
              />
            </>
          )}

          <Button onClick={handleSearch} sx={{ mt: 2 }}>
            Filter
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default FloatingToolMenu;
