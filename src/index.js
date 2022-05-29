import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import ForensicsDashboard from "layouts/index.js";


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/" element={<ForensicsDashboard />} />
      {/* add redirect for first page */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
    </Routes>
  </BrowserRouter>
);
