import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchUsers, User } from "../../../clients/apiClients";

type Options = {
  value: string;
  label: string;
};

export function UsersSelector(props: {
  setSelectedUserId: (arg: string) => void;
}) {
  const [users, setUsers] = useState<Array<User>>();
  const options: Array<Options> = [];

  useEffect(() => {
    fetchUsers().then((response) => setUsers(response));
  }, []);

  if (users === undefined) {
    return <section>Loading...</section>;
  }
  users.forEach((users: User) => {
    options.push({
      value: users.id.toString(),
      label: users.username,
    });
  });

  const isSelectOption = (v: unknown): v is Options => {
    return (v as Options).value !== undefined;
  };

  return (
    <div>
      <section className="plan-a-trip__location">
        <Select
          placeholder="filter by username"
          onChange={(v) => {
            if (isSelectOption(v)) {
              props.setSelectedUserId(v.value);
            }
          }}
          options={options}
          styles={{
            control: (styles) => ({
              ...styles,
              opacity: "0.8",
            }),
          }}
        />
      </section>
    </div>
  );
}
