import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./Styles/index.css";
import "./Styles/landingPage.css";
import "./Styles/dashboard.css";
import "./Styles/tradeform.css";
import "./Styles/analytics.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
