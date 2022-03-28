import React, { useEffect, useState } from "react";
import { GetMostRecentSighting, Sighting } from "../../../clients/apiClients";
import "./RecentSighting.scss";

export function RecentSighting() {
  const [recentSighting, setRecentSighting] = useState<Sighting>();
  useEffect(() => {
    GetMostRecentSighting().then(setRecentSighting);
  }, []);

  return (
    <section className="recent-sighting">
      <h1>Most Recent Whale Sighting 🐳</h1>
      <p>
        A {recentSighting?.species} Spotted on {recentSighting?.date} at{" "}
        {recentSighting?.location}
      </p>
      <div className="img-container">
        <img
          src={recentSighting?.photoUrl}
          width="250px"
          className="rounded-pill"
        />
      </div>
      <p className="p-5">{recentSighting?.description}</p>
    </section>
  );
}
