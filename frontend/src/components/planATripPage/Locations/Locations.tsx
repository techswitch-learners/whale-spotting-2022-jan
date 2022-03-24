import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchLocations, Location } from "../../../clients/apiClient";

type Options = {
  value: string;
  label: string;
};
export function Locations(): JSX.Element {
  const [locations, setLocations] = useState<Array<Location>>();
  const options: Array<Options> = [];
  const option: Options = {
    value: "",
    label: "",
  };

  useEffect(() => {
    fetchLocations().then((response) => setLocations(response));
  }, []);

  if (!locations) {
    return <section>Loading...</section>;
  }

  locations.forEach((location: Location) => {
    option.value = location.id.toString();
    option.label = location.name;
    console.log("Value = " + option.value + ", label = " + option.label);
    options.push(option);
  });

  console.log("Options = " + options[5].label);
  console.log("Options = " + options[1].label);
  return (
    <section className="get-location">
      <h1>Where do you want go Whale spotting?</h1>
      <Select options={options} />
    </section>
  );
}
