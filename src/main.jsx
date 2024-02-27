import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

import { BrowserRouter } from "react-router-dom";
import { ThemeWrapper } from "./context/theme.context.jsx";
import { ListThemeWrapper } from "./context/listTheme.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeWrapper>
      <ListThemeWrapper>
        <App />
      </ListThemeWrapper>
    </ThemeWrapper>
  </BrowserRouter>
);
