import { useEffect, useState } from "react";
import { getMostRecentSighting, Sighting } from "../../../clients/apiClients";
import "./RecentSighting.scss";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
// import  {Polaroid} from "polaroid-image";

export function RecentSighting() {
  const [recentSighting, setRecentSighting] = useState<Sighting>();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    getMostRecentSighting().then(setRecentSighting);
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
        <section>
          <div className="recent-sighting__img-front">
            <img
              src={recentSighting.photoUrl}
              width="500px"
              onClick={handleClick}
            ></img>
          </div>
        </section>
        <h1 className="recent-sighting__title">Most Recent Whale Sighting</h1>
        <section className="recent-sighting__text">
          <p>
            {article} {recentSighting?.species.name} (Latin name:{" "}
            {recentSighting.species.latinName}) spotted {diffDays} days ago at{" "}
            {recentSighting?.location.name} by {recentSighting.user.username}.
          </p>
          <p>Description of the sighting: {recentSighting?.description}</p>
        </section>
      </section>
    );
  }
}
