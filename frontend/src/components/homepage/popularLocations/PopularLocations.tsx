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
      <>
        <h1 className="popular-locations__title">
          Popular Whale sighting locations
        </h1>
        <section className="popular-locations__text-container">
          <section className="popular-locations__text popular-locations__left">
            <ul className="popular-locations__list-item">
              <li>
                <h5 className="popular-locations__list-item-heading">
                  {popularLocations[0].name}:
                </h5>
                {popularLocations[0].sightings.length} whale sightings
              </li>
              <li>
                <h5 className="popular-locations__list-item-heading">
                  {popularLocations[1].name}:
                </h5>
                {popularLocations[1].sightings.length} whale sightings
              </li>
            </ul>
          </section>
          <section className="popular-locations__text popular-locations__right">
            <h2 className="popular-locations__box-heading">
              Plan a whale spotting trip!
            </h2>
            <Link to="/plantrip">
              <Button
                variant="light"
                className="popular-locations__post-location-button"
              >
                <img
                  src="https://freepngimg.com/download/icon/1000188-spouting-whale-emoji-free-icon-hq.png"
                  width="30px"
                />
              </Button>{" "}
            </Link>
          </section>
        </section>
      </>
    );
}
