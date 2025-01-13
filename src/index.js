import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";

import { CsvDataProvider } from "./Contexts/CsvDataContext";
import { ThemeProvider } from "./Contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CsvDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CsvDataProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
