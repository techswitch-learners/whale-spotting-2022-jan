import React from "react";
import { Locations } from "./Locations/Locations";
import "./PlanAtripPage.scss";

export const PlanATripPage = () => {
  return (
    <main className="plan-a-trip__main">
      <h1 className="plan-a-trip__title">Plan a Trip</h1>
      <Locations />
    </main>
  );
};
