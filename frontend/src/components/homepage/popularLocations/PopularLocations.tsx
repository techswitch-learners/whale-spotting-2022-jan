import { useEffect, useState } from "react";
import { getPopularLocations, Location } from "../../../clients/apiClients";
import "./PopularLocations.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function PopularLocations() {
  const [popularLocations, setPopularLocations] = useState<Array<Location>>();
  useEffect(() => {
    getPopularLocations().then(setPopularLocations);
  }, []);
  if (popularLocations === undefined) {
    return <section>Loading...</section>;
  } else
    return (
      <section className="popular-locations_text-container">
        <section className="popular-locations__text popular-locations__left">
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
        <section className="popular-locations__text popular-locations__right">
          <h2 className="recent-sighting__box-heading">Plan a whale trip!</h2>
          <Button
            variant="light"
            className="popular-locations__post-sighting-button"
          >
            <Link to="/planatrip">
              <img
                src="https://freepngimg.com/download/icon/1000188-spouting-whale-emoji-free-icon-hq.png"
                width="30px"
              />
            </Link>
          </Button>{" "}
        </section>
      </section>
    );
}
