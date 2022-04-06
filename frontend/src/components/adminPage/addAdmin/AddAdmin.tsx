import React, { useState, FormEvent, useEffect, useContext } from "react";
import {
  fetchEndangeredStatus,
  EndangeredStatus,
} from "../../../clients/apiClients";
import { LoginContext } from "../../login/LoginManager";
import "./CreateSpeciesPage.scss";
import { Link } from "react-router-dom";
import { addAdmin } from "../../../clients/apiClients";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function AddAdmin(): JSX.Element {
  const [endangeredStatuses, setEndangeredStatuses] = useState<
    EndangeredStatus[]
  >([]);
  const [endangeredStatusId, setEndangeredStatusId] = useState<number>();
  const [userId, seUserId] = useState<number>();
  const [role, setRole] = useState<number>();
  const [status, setStatus] = useState<FromStatus>("READY");
  const { username, password } = useContext(LoginContext);

  const submitForm = (event: FormEvent) => {
    // event.preventDefault();
    // setStatus("SUBMITTING");
    // if (!endangeredStatusId) {
    //   setStatus("ERROR");
    //   return;
    // }
    // addAdmin(
    //   userId,
    //   {
    //     role
    //   },
    //   username,
    //   password
    // )
    //   .then(() => setStatus("FINISHED"))
    //   .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    fetchEndangeredStatus().then((response) => setEndangeredStatuses(response));
  }, []);

  const handleEndangeredStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEndangeredStatusId(Number(event.target.value));
  };

  return <></>;
}
