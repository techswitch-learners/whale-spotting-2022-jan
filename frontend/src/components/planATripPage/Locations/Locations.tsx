import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchLocations, Location } from "../../../clients/apiClient";
import { WeatherForecast } from "../WeatherForecast/WeatherForecast";
type Options = {
  value: string;
  label: string;
};
export function Locations(): JSX.Element {
  const [locations, setLocations] = useState<Array<Location>>();
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
  const latitude = 0;
  const longitude = 51;
  return (
    <div>
      <section className="get-location">
        <h1>Where do you want to go Whale Spotting?</h1>
        <Select options={options} />
      </section>
      <section>
        <WeatherForecast latitude={latitude} longitude={longitude} />
      </section>
    </div>
  );
}
