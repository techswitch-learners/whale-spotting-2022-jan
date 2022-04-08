import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchSpecies, Species } from "../../../clients/apiClients";

type Options = {
  value: string;
  label: string;
};

export function SpeciesSelector(props: {
  setSelectedSpeciesId: (arg: string) => void;
}) {
  const [species, setSpecies] = useState<Array<Species>>();
  const options: Array<Options> = [];

  useEffect(() => {
    fetchSpecies().then((response) => setSpecies(response));
  }, []);

  if (species === undefined) {
    return <section>Loading...</section>;
  }
  species.forEach((species: Species) => {
    options.push({
      value: species.id.toString(),
      label: species.name,
    });
  });

  const isSelectOption = (v: unknown): v is Options => {
    return (v as Options).value !== undefined;
  };

  return (
    <div>
      <section className="plan-a-trip__location">
        <Select
          placeholder="filter by species"
          onChange={(v) => {
            if (isSelectOption(v)) {
              props.setSelectedSpeciesId(v.value);
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
