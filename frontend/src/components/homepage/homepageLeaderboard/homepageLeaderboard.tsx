import { useEffect, useState } from "react";
import {
  getLeaderboard,
  getPopularLocations,
  LeaderboardEntry,
  Location,
} from "../../../clients/apiClients";
import "./HomepageLeaderboard.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function HomeLeaderboard() {
  const [topEntries, setTopEntries] = useState<Array<LeaderboardEntry>>();
  useEffect(() => {
    getLeaderboard().then(setTopEntries);
  }, []);
  if (topEntries === undefined) {
    return <section>Loading...</section>;
  } else
    return (
      <>
        <h1 className="home-leaderboard__title">Leaderboard Top 3</h1>
        <section className="home-leaderboard__text-container">
          <section className="home-leaderboard__text home-leaderboard__left">
            <ul className="home-leaderboard__list-item">
              <li>
                <h5 className="home-leaderboard__list-item-heading">
                  🥇 {topEntries[0].username} with a total of
                  {topEntries[0].count} sightings
                </h5>
              </li>
              <li>
                <h5 className="home-leaderboard__list-item-heading">
                  🥈 {topEntries[1].username} with a total of
                  {topEntries[1].count} sightings
                </h5>
              </li>
              <li>
                <h5 className="home-leaderboard__list-item-heading">
                  🥉 {topEntries[2].username} with a total of
                  {topEntries[2].count} sightings
                </h5>
              </li>
            </ul>
          </section>
          <section className="home-leaderboard__text home-leaderboard__right">
            <h2 className="home-leaderboard__box-heading">Full Leaderboard</h2>
            <Link to="/leaderboard">
              <Button
                variant="light"
                className="home-leaderboard__post-location-button"
              >
                <img
                  src="https://freepngimg.com/download/icon/1000188-spouting-whale-emoji-free-icon-hq.png"
                  width="30"
                />
              </Button>{" "}
            </Link>
          </section>
        </section>
      </>
    );
}
