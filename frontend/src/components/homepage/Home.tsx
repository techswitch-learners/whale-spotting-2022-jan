import React from "react";
import "./Home.scss";
import { RecentSighting } from "./recentSighting/RecentSighting";

export const Home: React.FunctionComponent = () => (
  <>
    <h1>Whale Spotting</h1>
    <RecentSighting />
  </>
);
