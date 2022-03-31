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
        <h1 className="popular-locations__title">
          Popular Whale sighting locations
        </h1>
        <ol className="popular-locations__text">
          <li>
            <h5>{popularLocations[0].name}:</h5>
            {popularLocations[0].sightings.length} whale sightings
          </li>
          <li>
            <h5>{popularLocations[1].name}:</h5>
            {popularLocations[1].sightings.length} whale sightings
          </li>
        </ol>
      </section>
    );
}
