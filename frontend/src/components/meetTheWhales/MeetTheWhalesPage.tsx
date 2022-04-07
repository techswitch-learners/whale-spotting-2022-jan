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

  function AlreadySponsor(name: string, arr: User[]) {
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
              <h5 className="whales__card__common-name">{w.species.name}</h5>
              <div className="whales__card__grid">
                <img className="whales__image" src={w.photoUrl} alt={w.name} />
                <div className="whales__card__info--wrapper">
                  <p className="whales__card__info--emphasis">
                    <span className="whales__card__info__title">
                      Conservation status:
                    </span>{" "}
                    {w.species.endangeredStatus}
                  </p>
                  <p className="whales__card__info--emphasis">
                    <span className="whales__card__info__title">
                      Description:{" "}
                    </span>{" "}
                    {w.description}
                  </p>
                  <p className="whales__card__info--sponsors">
                    <span className="whales__card__info__title">
                      Sponsored by our members:{" "}
                    </span>
                    {stringOfUsers(w.users)}
                  </p>
                </div>
              </div>
              <form className="submit__form" onSubmit={submitForm}>
                <button
                  className="btn btn-primary whales__card__button"
                  type="submit"
                  disabled={
                    status === "SUBMITTING" ||
                    !loginContext.isLoggedIn ||
                    AlreadySponsor(username, w.users)
                  }
                  onClick={(event) => setWhaleId(w.id)}
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
