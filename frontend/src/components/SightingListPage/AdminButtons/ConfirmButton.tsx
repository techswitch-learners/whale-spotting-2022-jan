import React, { useContext } from "react";
import { approveSighting, User } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function ConfirmButton({
  approvedBy,
  sightingId,
  setConfirmed: setConfirmed,
}: {
  approvedBy: User;
  sightingId: number;
  setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { username, password } = useContext(LoginContext);

  const confirmWhaleSighting = () => {
    approveSighting(sightingId, username, password).then(() =>
      setConfirmed(true)
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
    </div>
  );
}
