import React, { useContext } from "react";
import {
  approveSighting,
  deleteSighting,
  User,
} from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function AdminButtons({
  approvedBy,
  sightingId,
  setActionOnConfirm,
  setActionOnDelete,
}: {
  approvedBy: User;
  sightingId: number;
  setActionOnConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setActionOnDelete: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { username, password } = useContext(LoginContext);

  const confirmWhaleSighting = () => {
    approveSighting(sightingId, username, password).then(() =>
      setActionOnConfirm(true)
    );
  };
  const deleteWhaleSighting = () => {
    deleteSighting(sightingId, username, password).then(() =>
      setActionOnDelete(true)
    );
  };

  return (
    <div className="sighting__card__btns">
      <button
        className="sighting__button btn btn-primary"
        disabled={!!approvedBy}
        onClick={() => {
          confirmWhaleSighting();
        }}
        type="submit"
      >
        Confirm
      </button>
      <button
        className="sighting__button btn btn-primary"
        onClick={() => {
          deleteWhaleSighting();
        }}
        type="submit"
      >
        Delete
      </button>
    </div>
  );
}
