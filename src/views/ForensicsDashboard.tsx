import * as React from "react";

import HeaderStats from '../components/HeaderStats';
import Table from "../components/Table";

const ForensicsDashboard = () => {
  return (
    <>
      <div className="relative bg-slate-100">
        {/* Header */}
        <HeaderStats />
        {/* Tables */}
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForensicsDashboard;