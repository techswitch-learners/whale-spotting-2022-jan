import React, { useState, FormEvent, useEffect, useContext } from "react";
import "./MeetTheWhalesPage.scss";
import {
  Whales,
  GetAllWhales,
  createInteraction,
  Interaction,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function MeetTheWhalesPage(): JSX.Element {
  const [whales, setWhales] = useState<Array<Whales>>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [whaleId, setWhaleId] = useState<number>(1);
  const [interactions, setInteractions] = useState<Array<Interaction>>([]);
  const [status, setStatus] = useState<FromStatus>("READY");

  const { username, password } = useContext(LoginContext);
  console.log(username);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    createInteraction(
      {
        date,
        whaleId,
      },
      username,
      password
    )
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

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
              <form onSubmit={submitForm}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={status === "SUBMITTING"}
                >
                  Sponsore Me!
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
