import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import HeaderStats from "components/Headers/HeaderStats.js";

// views
import Tables from "views/Tables.js";

export default function ForensicsDashboard() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/forensics/tables" exact component={Tables} />
            <Redirect from="/" to="/forensics/tables" />
          </Switch>
        </div>
      </div>
    </>
  );
}
