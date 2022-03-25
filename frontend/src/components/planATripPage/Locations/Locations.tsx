import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchLocations, Location } from "../../../clients/apiClients";
import { WeatherForecast } from "../Weather/WeatherForecast";
type Options = {
  value: string;
  label: string;
};
export function Locations(): JSX.Element {
  const [locations, setLocations] = useState<Array<Location>>();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const options: Array<Options> = [];

  useEffect(() => {
    fetchLocations().then((response) => setLocations(response));
  }, []);

  if (!locations) {
    return <section>Loading...</section>;
  }
  locations.forEach((location: Location) => {
    options.push({
      value: location.id.toString(),
      label: location.name,
    });
  });
  const latitude = -34;
  const longitude = 19;
  const isSelectOption = (v: any): v is Options => {
    if ((v as Options).value !== undefined) return v.value;
    return false;
  };
  return (
    <div>
      <section className="get-location">
        <h1>Where do you want to go Whale Spotting?</h1>
        <Select
          onChange={(v) => {
            if (isSelectOption(v)) {
              setSelectedLocation(v.value);
            }
          }}
          options={options}
        />
        you chose:{selectedLocation}
      </section>
      <section>
        <WeatherForecast latitude={latitude} longitude={longitude} />
      </section>
    </div>
  );
}
