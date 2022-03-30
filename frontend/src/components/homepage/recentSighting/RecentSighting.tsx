import ar from "date-fns/esm/locale/ar/index.js";
import React, { useEffect, useState } from "react";
import { GetMostRecentSighting, Sighting } from "../../../clients/apiClients";
import "./RecentSighting.scss";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
// import  {Polaroid} from "polaroid-image";

export function RecentSighting() {
  const [recentSighting, setRecentSighting] = useState<Sighting>();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    GetMostRecentSighting().then(setRecentSighting);
  }, []);

  if (recentSighting == undefined) {
    return <div> Loading ... </div>;
  } else {
    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

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
        <h1 className="recent-sighting__title">Most Recent Whale Sighting</h1>
        <p className="recent-sighting__text">
          {article} {recentSighting?.species.name} Spotted {diffDays} days ago
          at {recentSighting?.location.name}
        </p>
        <div className="img-container">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <section>
              <div className="recent-sighting__img-back">
                <img
                  src={recentSighting.photoUrl}
                  width="500px"
                  onClick={handleClick}
                ></img>
              </div>
            </section>

            <section>
              <div className="recent-sighting__img-back" onClick={handleClick}>
                <ol>
                  <li>{recentSighting.species.latinName}</li>
                  <li>Spotted By:{recentSighting.user.username}</li>
                  <li>
                    {" "}
                    Want to see it yourself? Plan your own trip to{" "}
                    <Link to="/login">{recentSighting.location.name}</Link>
                  </li>
                </ol>
              </div>
            </section>
          </ReactCardFlip>
        </div>
        <p className="recent-sighting__text">{recentSighting?.description}</p>
      </section>
    );
  }
}
