import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

// Font
import "@fontsource/roboto";

// Material-UI
import { CssBaseline } from "@material-ui/core";

// Theme
import { ThemeContextProvider } from "./theme/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CssBaseline />
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
