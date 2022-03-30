import ar from "date-fns/esm/locale/ar/index.js";
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

    let article;
    const l = recentSighting.species.name[0];
    if (l == "A" || l == "E" || l == "I" || l == "O" || l == "U") {
      article = "An";
    } else {
      article = "A";
    }

    return (
      <section className="recent-sighting">
        <h1 className="recent-sighting__title">
          Most Recent Whale Sighting 🐳
        </h1>
        <p className="recent-sighting__text">
          {article} {recentSighting?.species.name} Spotted {diffDays} days ago
          at {recentSighting?.location.name}
        </p>
        <div className="img-container">
          <img
            src={recentSighting?.photoUrl}
            width="250px"
            className="recent-sighting__img"
          />
          <p className="recent-sighting__text">
            Spotted by {recentSighting.user.username}
          </p>
        </div>
        <p className="recent-sighting__text">{recentSighting?.description}</p>
      </section>
    );
  }
}
