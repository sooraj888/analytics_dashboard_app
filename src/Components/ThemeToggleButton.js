import React from "react";
import { useTheme } from "../Contexts/ThemeContext";
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Toggle to {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
};

export default ThemeToggleButton;
