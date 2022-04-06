import React, { useContext } from "react";
import { Sighting } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function InternalSighting({
  s,
  confirmWhaleSighting,
  deleteWhaleSighting,
  i,
}: {
  s: Sighting;
  confirmWhaleSighting: (sightingId: number) => void;
  deleteWhaleSighting: (sightingId: number) => void;
  i: number;
}) {
  const { isAdmin } = useContext(LoginContext);

  return (
    <li className="sighting__list__item" key={i}>
      <div className="sighting__card">
        <h2 className="sighting__card__title">
          {s.species.name} ({s.species.latinName})
        </h2>
        <img
          className="sighting__image"
          src={s.photoUrl}
          alt={s.description}
          width="250"
        />
        <div className="sighting__card__info">
          <p>About: {s.description}</p>
          <p>Sighting Location: {s.location.name}</p>
          <p>On: {new Date(s.date).toLocaleDateString("en-gb")}</p>
          <p>
            Seen by: {s.user.name} ({s.user.username})
          </p>
          {s.approvedBy !== null ? <p>Confirmed ☑</p> : <></>}
          {isAdmin ? (
            <div className="sighting__card__btns">
              <button
                className="sighting__button btn btn-primary"
                disabled={!!s.approvedBy}
                onClick={() => {
                  confirmWhaleSighting(s.id);
                }}
                type="submit"
              >
                Confirm
              </button>
              <button
                className="sighting__button btn btn-primary"
                onClick={() => {
                  deleteWhaleSighting(s.id);
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
