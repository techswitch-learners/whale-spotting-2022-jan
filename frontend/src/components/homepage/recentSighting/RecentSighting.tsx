import React, { useEffect, useState } from "react";
import { GetMostRecentSighting, Sighting } from "../../../clients/apiClients";

export function RecentSighting() {
  const [recentSighting, setRecentSighting] = useState<Sighting>();
  useEffect(() => {
    GetMostRecentSighting().then(setRecentSighting);
  }, []);

  return (
    <section>
      <h1>Most Recent Whale Sighting 🐳</h1>
      <p>
        A {recentSighting?.species} Spotted on {recentSighting?.date} at{" "}
        {recentSighting?.location}
      </p>
      <figure>
        <img src={recentSighting?.photoUrl} width="250px" />
        <figcaption>{recentSighting?.description}</figcaption>
      </figure>
    </section>
  );
}
