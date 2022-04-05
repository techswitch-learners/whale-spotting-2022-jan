import { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import {
  approveSighting,
  deleteSighting,
  Sighting,
} from "../../clients/apiClients";
import { GetAllSightings } from "../../clients/apiClients";
import { LocationSelector } from "../../components/planATripPage/Locations/LocationSelector/LocationSelector";
import { SpeciesSelector } from "./SpeciesSelector/SpeciesSelector";
import { LoginContext } from "../../components/login/LoginManager";

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  const { username, password, isAdmin } = useContext(LoginContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>("");

  useEffect(() => {
    GetAllSightings(+selectedLocationId, +selectedSpeciesId).then(setSightings);
  }, [selectedLocationId, selectedSpeciesId]);

  const confirmWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      approveSighting(sightingId, username, password).then(() =>
        GetAllSightings(0, 0).then(setSightings)
      );
    }
  };
  const deleteWhaleSighting = (sightingId: number) => {
    if (sightingId) {
      deleteSighting(sightingId, username, password).then(() =>
        GetAllSightings(0, 0).then(setSightings)
      );
    }
  };

  return (
    <div className="sighting__list__body">
      <h1 className="sighting__list__title">Sightings</h1>
      <section className="sightings__filters">
        <div className="sighting__filters__location">
          <LocationSelector setSelectedLocationId={setSelectedLocationId} />
        </div>
        <div className="sighting__filters__species">
          <SpeciesSelector setSelectedSpeciesId={setSelectedSpeciesId} />
        </div>
      </section>
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
        ))}
      </ul>
    </div>
  );
}
