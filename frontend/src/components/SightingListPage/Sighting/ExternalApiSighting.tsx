import React, { useContext } from "react";
import { ExternalSighting } from "../../../clients/apiClients";

export function ExternalApiSighting({
  s,
  i,
}: {
  s: ExternalSighting;
  i: number;
}) {
  return (
    <li className="sighting__list__item" key={i}>
      <div className="sighting__card">
        <h2 className="sighting__card__title">
          {s.species[0].name} ({s.species[0].latinName})
        </h2>
        <img
          className="sighting__image"
          src={s.photoUrl}
          alt={s.species[0].name}
          width="250"
        />
        <div className="sighting__card__info">
          <p>Sighting Location: {s.location.name}</p>
          <p>On: {new Date(s.date).toLocaleDateString("en-gb")}</p>
          <p>Seen by: {s.email}</p>
          <p>Confirmed ☑</p>
        </div>
      </div>
    </li>
  );
}
