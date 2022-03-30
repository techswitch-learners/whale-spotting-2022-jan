import React, { useEffect, useState } from "react";
import { GetPopularLocations, Location } from "../../../clients/apiClients";
import "./PopularLocations.scss";

export function PopularLocations() {
  const [popularLocations, setPopularLocations] = useState<Array<Location>>();
  useEffect(() => {
    GetPopularLocations().then(setPopularLocations);
  }, []);
  if (popularLocations === undefined) {
    return <section>Loading...</section>;
  } else
    return (
      <section>
        <h1 className="popular-locations__title">
          Popular Whale sighting locations
        </h1>
        <ol className="popular-locations__text">
          <li>
            {popularLocations[0].name}: {popularLocations[0].sightings.length}{" "}
            whale sightings
          </li>
          <li>
            {popularLocations[1].name}: {popularLocations[1].sightings.length}{" "}
            whale sightings
          </li>
        </ol>
      </section>
    );
}
