import { useEffect, useState } from "react";
import "./MeetTheWhalesPage.scss";
import {
  fetchSpecies,
  Species,
  Whales,
  GetAllWhales,
} from "../../clients/apiClients";

export function MeetTheWhalesPage(): JSX.Element {
  const [whales, setWhales] = useState<Array<Whales>>([]);

  useEffect(() => {
    GetAllWhales().then(setWhales);
  }, []);

  return (
    <div className="whales__list__body">
      <h1 className="whales__list__title">Meet the Whales!</h1>
      <ul className="list-group list-group-flush">
        {whales.map((w, i) => (
          <li className="whales__list__item" key={i}>
            <div className="whales__card">
              <h2 className="whales__card__title">{w.name}</h2>
              <h3 className="whales__card__common-name">
                ({w.species.name} {w.species.latinName})
              </h3>
              <figure className="whales__image">
                <img
                  className="whales__image"
                  src={w.photoUrl}
                  alt={w.name}
                  width="250px"
                />
                <figcaption className="whales__card__info--emphasis">
                  Conservation status: {w.species.endangeredStatus}
                </figcaption>
              </figure>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
