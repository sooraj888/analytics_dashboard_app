import React from "react";
import { useTheme } from "../Contexts/ThemeContext";

import styles from "./ThemeContainer.module.css";

const ThemeContainer = ({ children }) => {
  return <div className={styles.themeContainer}>{children}</div>;
};

export default ThemeContainer;
