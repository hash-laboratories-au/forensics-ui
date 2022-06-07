import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import './assets/styles/tailwind.css';
import 'antd/dist/antd.css';

import ForensicsDashboard from './views/ForensicsDashboard';

const root = createRoot(document.getElementById("root"));

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
