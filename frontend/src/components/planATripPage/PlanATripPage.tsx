import React from "react";
import { Locations } from "./Locations/Locations";
import "./PlanAtripPage.scss";

export const PlanATripPage = () => {
  return (
    <main className="planATrip__main">
      <h1 className="planATrip__title">Plan a Trip</h1>
      <Locations />
    </main>
  );
};
