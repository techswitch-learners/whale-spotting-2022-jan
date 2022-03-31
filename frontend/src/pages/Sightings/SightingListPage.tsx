import { type } from "os";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import { Link } from "react-router-dom";
import { approveSighting, Sighting } from "../../clients/apiClients";
import { GetAllSightings } from "../../clients/apiClients";
import { LoginContext } from "../../components/login/LoginManager";
import { set } from "date-fns";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const [sightingId, setSightingId] = useState<number>();
  const { username, password, isAdmin } = useContext(LoginContext);

  useEffect(() => {
    GetAllSightings().then(setSightings);
  }, []);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    if (sightingId) {
      approveSighting(sightingId, username, password);
    }
  };

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
                {s.approvedBy !== null ? <p>Confirmed ☑</p> : <></>}
                {isAdmin ? (
                  <div>
                    <form onSubmit={submitForm}>
                      <button
                        value={s.id}
                        onClick={() => setSightingId(s.id)}
                        type="submit"
                      >
                        Confirm
                      </button>
                    </form>
                    <form>
                      <button type="submit">Delete</button>
                    </form>
                  </div>
                ) : (
                  <> </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
