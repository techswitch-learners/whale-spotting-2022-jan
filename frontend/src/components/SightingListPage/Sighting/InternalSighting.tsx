import React, { useContext } from "react";
import { Sighting } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function InternalSighting({
  sighting,
  confirmWhaleSighting,
  deleteWhaleSighting,
  index,
}: {
  sighting: Sighting;
  confirmWhaleSighting: (sightingId: number) => void;
  deleteWhaleSighting: (sightingId: number) => void;
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
            <div className="sighting__card__btns">
              <button
                className="sighting__button btn btn-primary"
                disabled={!!sighting.approvedBy}
                onClick={() => {
                  confirmWhaleSighting(sighting.id);
                }}
                type="submit"
              >
                Confirm
              </button>
              <button
                className="sighting__button btn btn-primary"
                onClick={() => {
                  deleteWhaleSighting(sighting.id);
                }}
                type="submit"
              >
                Delete
              </button>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </li>
  );
}
