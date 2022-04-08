import React, { useContext } from "react";
import { deleteSighting } from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";

export function DeleteButton({
  sightingId,
  setDeleted,
}: {
  sightingId: number;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { username, password } = useContext(LoginContext);

  const deleteWhaleSighting = () => {
    deleteSighting(sightingId, username, password).then(() => setDeleted(true));
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
