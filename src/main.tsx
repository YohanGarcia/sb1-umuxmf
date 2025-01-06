import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: "ASbuCB5K9rDarRWcVi4nolXt0L8WGJjXh3NxdP7fIUkEupKN8nP1VO18F_hk0R7StZa5aZEdD1oBACQL",
  currency: "USD",
  intent: "capture",
  components: "buttons",

};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <App />
      </Router>
    </PayPalScriptProvider>
  </StrictMode>
);
