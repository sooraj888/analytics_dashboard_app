import React from "react";
import { useTheme } from "../Contexts/ThemeContext";
import { FaMoon } from "react-icons/fa"; // Import icons
import { IoSunny } from "react-icons/io5";
import styles from "./ThemeToggleButton.module.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.button}
      style={{ backgroundColor: theme === "light" ? "#333" : "gray" }}
      onClick={toggleTheme}
    >
      {theme === "light" ? <FaMoon /> : <IoSunny color="#FFD700" />}
    </button>
  );
};

export default ThemeToggleButton;
