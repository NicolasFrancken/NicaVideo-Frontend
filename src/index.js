import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "react-auth-kit";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
