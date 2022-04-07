import React, { useContext, useState } from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";
import { ConfirmButton } from "../AdminButtons/ConfirmButton";
import { DeleteButton } from "../AdminButtons/DeleteButton";

export function InternalSighting({
  sighting,
  index,
}: {
  setCombinedSightingList: React.Dispatch<
    React.SetStateAction<(Sighting | ExternalSighting)[]>
  >;
  sighting: Sighting;
  index: number;
}) {
  const { isAdmin } = useContext(LoginContext);
  const [actionOnConfirm, setActionOnConfirm] = useState<boolean>(false);
  const [actionOnDelete, setActionOnDelete] = useState<boolean>(false);

  if (actionOnDelete)
    return (
      <li className="sighting__list__item" key={index}>
        <div className="sighting__card">
          <h2 className="sighting__card__title">This post was deleted</h2>
        </div>
      </li>
    );

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
          {actionOnConfirm || sighting.approvedBy ? (
            <>
              <p>Confirmed ☑</p>
              <DeleteButton
                sightingId={sighting.id}
                setActionOnDelete={setActionOnDelete}
              />
            </>
          ) : isAdmin ? (
            <div className="sighting__card__btns">
              <ConfirmButton
                approvedBy={sighting.approvedBy}
                sightingId={sighting.id}
                setActionOnConfirm={setActionOnConfirm}
              />
              <DeleteButton
                sightingId={sighting.id}
                setActionOnDelete={setActionOnDelete}
              />
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </li>
  );
}
