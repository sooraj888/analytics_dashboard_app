import React, { Children } from "react";
import { useTheme } from "../Contexts/ThemeContext";

const ThemeContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = {
    light: {
      backgroundColor: "#fff",
      color: "#000",
    },
    dark: {
      backgroundColor: "#333",
      color: "#fff",
    },
  };
  const containerStyles = {
    ...styles[theme],
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  };
  return <div style={containerStyles}>{children}</div>;
};

export default ThemeContainer;
