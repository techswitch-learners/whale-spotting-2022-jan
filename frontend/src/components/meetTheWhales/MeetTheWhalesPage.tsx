import { useContext, useEffect, useState } from "react";
import "./MeetTheWhalesPage.scss";
import { fetchSpecies, Species } from "../../clients/apiClients";
import { GetAllSightings } from "../../clients/apiClients";

export function MeetTheWhalesPage(): JSX.Element {
  const [species, setSpecies] = useState<Array<Species>>([]);
  const [speciesId, setSpeciesId] = useState<number>();

  useEffect(() => {
    fetchSpecies().then(setSpecies);
  }, []);

  return (
    <div className="species__list__body">
      <h1 className="species__list__title">Sightings</h1>
      <ul className="list-group list-group-flush">
        {species.map((s, i) => (
          <li className="species__list__item" key={i}>
            <div className="species__card">
              <h2 className="species__card__title">
                {s.name} ({s.latinName})
              </h2>
              <img
                className="species__image"
                src={s.photoUrl}
                alt={s.description}
                width="250px"
                // height="300"
              />
              <div className="species__card__info">
                <p>About: {s.description}</p>
                <p>Conservation status: {s.endangeredStatus}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
