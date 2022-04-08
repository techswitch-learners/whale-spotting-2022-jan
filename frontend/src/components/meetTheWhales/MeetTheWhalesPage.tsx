import React, { useState, FormEvent, useEffect, useContext } from "react";
import "./MeetTheWhalesPage.scss";
import {
  Whales,
  GetAllWhales,
  createInteraction,
  User,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function MeetTheWhalesPage(): JSX.Element {
  const [whales, setWhales] = useState<Array<Whales>>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [whaleId, setWhaleId] = useState<number>(1);
  const [status, setStatus] = useState<FromStatus>("READY");

  const { username, password } = useContext(LoginContext);
  const loginContext = useContext(LoginContext);

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
      .then(() => {
        setStatus("FINISHED");
        GetAllWhales().then(setWhales);
      })
      .catch(() => setStatus("ERROR"));
  };

  function stringOfUsers(arr: User[]) {
    if (arr.length > 0) {
      return arr.slice(1).reduce(function (acc, currVal) {
        return acc + (", " + currVal.name + " (" + currVal.username + ") ");
      }, " " + arr[0].name + " (" + arr[0].username + ")");
    } else return "";
  }

  function alreadySponsor(name: string, arr: User[]) {
    return arr.some((el) => {
      return el.username == name;
    });
  }

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
                <figcaption className="whales__card__info--emphasis">
                  Description: {w.description}
                </figcaption>
                <p className="whales__card__info--sponsors">
                  Sponsored by our members:
                  {stringOfUsers(w.users)}
                </p>
              </figure>
              <form className="submit__form" onSubmit={submitForm}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={
                    status === "SUBMITTING" ||
                    !loginContext.isLoggedIn ||
                    alreadySponsor(username, w.users)
                  }
                  onClick={(event) => setWhaleId(w.id)}
                >
                  Sponsor Me!
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
