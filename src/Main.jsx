import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./helpers/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/index.css";
import "sweetalert2/src/sweetalert2.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
