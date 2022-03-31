import React from "react";
import "./Home.scss";
import { PopularLocations } from "./popularLocations/PopularLocations";
import { RecentSighting } from "./recentSighting/RecentSighting";

export const Home: React.FunctionComponent = () => {
  return (
    <div className="homepage">
      <h1>Whale Spotting</h1>
      <RecentSighting />
      <PopularLocations />
    </div>
  );
};
