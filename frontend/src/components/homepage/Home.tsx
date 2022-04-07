import React from "react";
import { Leaderboard } from "../../pages/Leaderboard/Leaderboard";
import "./Home.scss";
import { PopularLocations } from "./popularLocations/PopularLocations";
import { RecentSighting } from "./recentSighting/RecentSighting";

export const Home: React.FunctionComponent = () => {
  return (
    <div className="homepage">
      <h1 className="homepage__title">Whale Spotting 🐳</h1>
      <RecentSighting />
      <PopularLocations />
      <Leaderboard />
    </div>
  );
};
