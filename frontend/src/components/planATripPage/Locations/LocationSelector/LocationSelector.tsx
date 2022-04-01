import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchLocations, Location } from "../../../../clients/apiClients";

type Options = {
  value: string;
  label: string;
};

export function LocationSelector(props: {
  setSelectedLocationId: (arg: string) => void;
}) {
  const [locations, setLocations] = useState<Array<Location>>();
  const options: Array<Options> = [];

  useEffect(() => {
    fetchLocations().then((response) => setLocations(response));
  }, []);

  if (locations === undefined) {
    return <section>Loading...</section>;
  }
  locations.forEach((location: Location) => {
    options.push({
      value: location.id.toString(),
      label: location.name,
    });
  });

  const isSelectOption = (v: unknown): v is Options => {
    return (v as Options).value !== undefined;
  };

  return (
    <div>
      <section className="plan-a-trip__location">
        <p className="plan-a-trip__text">Choose a location</p>
        <Select
          onChange={(v) => {
            if (isSelectOption(v)) {
              props.setSelectedLocationId(v.value);
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
