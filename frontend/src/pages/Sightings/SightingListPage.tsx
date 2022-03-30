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
    <>
      <h1 className="title">Sightings</h1>
      <ul className="sighting_list">
        {sightings.map((s, i) => (
          <li className="sighting_list_item" key={i}>
            <div className="sighting">
              <h2>
                {s.species.name} ({s.species.latinName})
              </h2>

              <img src={s.photoUrl} alt={s.description} />

              <div className="sighting_info">
                <p>About: {s.description}</p>
                <p>Sighting Location: {s.location.name}</p>
                <p>On: {s.date}</p>
                <p>
                  Seen by: {s.user.name} ({s.user.username})
                </p>
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
    </>
  );
}
