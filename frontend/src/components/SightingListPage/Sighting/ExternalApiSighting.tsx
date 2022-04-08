import React, { useContext } from "react";
import { ExternalSighting } from "../../../clients/apiClients";

export function ExternalApiSighting({
  sighting,
  index,
}: {
  sighting: ExternalSighting;
  index: number;
}) {
  return (
    <li className="sighting__list__item" key={index}>
      <div className="sighting__card">
        <h2 className="sighting__card__title">
          {sighting.species[0].name} ({sighting.species[0].latinName})
        </h2>
        <img
          className="sighting__image"
          src={sighting.photoUrl}
          alt={sighting.species[0].name}
          width="250"
        />
        <div className="sighting__card__info">
          <p>Sighting Location: {sighting.location.name}</p>
          <p>On: {new Date(sighting.date).toLocaleDateString("en-gb")}</p>
          <p>Seen by: {sighting.email}</p>
          <p>Worldwide 🌍</p>
        </div>
      </div>
    </li>
  );
}
