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
            Location Name 1: {popularLocations[0].name}, with a total of{" "}
            {popularLocations[0].sightings.length} sightings!
          </li>
          <li>
            Location Name 2: {popularLocations[1].name}, with a total of{" "}
            {popularLocations[1].sightings.length} sightings!
          </li>
        </ol>
      </section>
    );
}
