import { type } from "os";
import React, { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import "../../styles/constants.scss";
import { Link } from "react-router-dom";
import { Sighting } from "../../clients/apiClients";
import { GetAllSightings } from "../../clients/apiClients";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  useEffect(() => {
    GetAllSightings().then(setSightings);
  }, []);

  return (
    <div className="sighting__list__body">
      <h1 className="sigthing__list__title">Sightings</h1>
      <ul className="list-group list-group-flush">
        {sightings.map((s, i) => (
          <li className="sighting__list__item" key={i}>
            <div className="sighting__card">
              <h2 className="sighting__card__title">
                {s.species.name} ({s.species.latinName})
              </h2>
              <img
                className="sighting__image"
                src={s.photoUrl}
                alt={s.description}
                width="700"
                height="300"
              />
              <div className="sighting__card__info">
                <p>About: {s.description}</p>
                <p>Sighting Location: {s.location.name}</p>
                <p>On: {s.date}</p>
                <p>
                  Seen by: {s.user.name} ({s.user.username})
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
