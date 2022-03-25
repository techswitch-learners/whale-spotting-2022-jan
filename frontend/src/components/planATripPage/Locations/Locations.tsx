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
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
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
              setSelectedLocationId(v.value);
              const selectedLocation = locations.find((e) => e.id == +v.value);
              setLatitude(selectedLocation?.latitude);
              setLongitude(selectedLocation?.longitude);
            }
          }}
          options={options}
        />
      </section>
      {selectedLocationId ? (
        <section>
          <WeatherForecast latitude={latitude} longitude={longitude} />
        </section>
      ) : (
        <> </>
      )}
    </div>
  );
}
