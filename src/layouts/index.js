import React from "react";

// components
import HeaderStats from "components/Headers/HeaderStats.js";

// views
import Tables from "views/Tables.js";

export default function ForensicsDashboard() {
  return (
    <>
      <div className="relative bg-slate-100">
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Tables />
        </div>
      </div>
    </>
  );
}
