import { useEffect, useState } from "react";
import { getPopularLocations, Location } from "../../../clients/apiClients";

export function PopularLocations() {
  const [popularLocations, setPopularLocations] = useState<Array<Location>>();
  useEffect(() => {
    getPopularLocations().then(setPopularLocations);
  }, []);
  if (popularLocations === undefined) {
    return <section>Loading...</section>;
  } else
    return (
      <section>
        <h1>See locations with the most whale sightings:</h1>
        <ol>
          <li>
            Location Name 1: {popularLocations[0].name}, with a total of
            {popularLocations[0].sightings.length} sightings!
          </li>
          <li>
            Location Name 2: {popularLocations[1].name}, with a total of
            {popularLocations[1].sightings.length} sightings!
          </li>
        </ol>
      </section>
    );
}
