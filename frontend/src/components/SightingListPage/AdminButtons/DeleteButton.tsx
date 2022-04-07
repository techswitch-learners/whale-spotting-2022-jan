import React, { useContext } from "react";
import { deleteSighting } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function DeleteButton({
  sightingId,
  setActionOnDelete,
}: {
  sightingId: number;
  setActionOnDelete: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { username, password } = useContext(LoginContext);

  const deleteWhaleSighting = () => {
    deleteSighting(sightingId, username, password).then(() =>
      setActionOnDelete(true)
    );
  };

  return (
    <button
      className="sighting__button btn btn-primary"
      onClick={() => {
        deleteWhaleSighting();
      }}
      type="submit"
    >
      Delete
    </button>
  );
}
