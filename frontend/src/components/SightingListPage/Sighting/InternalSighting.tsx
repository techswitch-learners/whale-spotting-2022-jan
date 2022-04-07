import React, { useContext } from "react";
import { Sighting } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";
import { AdminButtons } from "../AdminButtons/AdminButtons";

export function InternalSighting({
  setSightings,
  sighting,
  index,
}: {
  setSightings: React.Dispatch<React.SetStateAction<Sighting[]>>;
  sighting: Sighting;
  index: number;
}) {
  const { isAdmin } = useContext(LoginContext);

  return (
    <li className="sighting__list__item" key={index}>
      <div className="sighting__card">
        <h2 className="sighting__card__title">
          {sighting.species.name} ({sighting.species.latinName})
        </h2>
        <img
          className="sighting__image"
          src={sighting.photoUrl}
          alt={sighting.description}
          width="250"
        />
        <div className="sighting__card__info">
          <p>About: {sighting.description}</p>
          <p>Sighting Location: {sighting.location.name}</p>
          <p>On: {new Date(sighting.date).toLocaleDateString("en-gb")}</p>
          <p>
            Seen by: {sighting.user.name} ({sighting.user.username})
          </p>
          {sighting.approvedBy !== null ? <p>Confirmed ☑</p> : <></>}
          {isAdmin ? (
            <AdminButtons sighting={sighting} setSightings={setSightings} />
          ) : (
            <> </>
          )}
        </div>
      </div>
    </li>
  );
}
