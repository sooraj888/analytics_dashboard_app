import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <h1>Electric Vehicle Analytics</h1>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All EV Analytics</Link>
            </li>
            <li>
              <Link to="/ev-details">EV Details</Link>
            </li>
            <li>
              <Link to="/ev-maker-details">EV Maker Details</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggleButton />
      </div>
    </div>
  );
}
