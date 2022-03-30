import React, { useEffect, useState } from "react";
import { GetMostRecentSighting, Sighting } from "../../../clients/apiClients";
import "./RecentSighting.scss";

export function RecentSighting() {
  const [recentSighting, setRecentSighting] = useState<Sighting>();
  useEffect(() => {
    GetMostRecentSighting().then(setRecentSighting);
  }, []);

  if (recentSighting == undefined) {
    return <div> Loading ... </div>;
  } else {
    const today = new Date();
    const date2 = new Date(recentSighting.date);

    const diff = Math.abs(today.getTime() - date2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    return (
      <section className="recent-sighting">
        <h1>Most Recent Whale Sighting 🐳</h1>
        <p>
          A {recentSighting?.species.name} Spotted {diffDays} days ago at{" "}
          {recentSighting?.location.name}
        </p>
        <div className="img-container">
          <img
            src={recentSighting?.photoUrl}
            width="250px"
            className="rounded-pill"
          />
          <p>Spotted by {recentSighting.user.username}</p>
        </div>
        <p className="p-5">{recentSighting?.description}</p>
      </section>
    );
  }
}
