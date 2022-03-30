import { useEffect, useState } from "react";
import Select from "react-select";
import { fetchLocations, Location } from "../../../clients/apiClients";
import { WeatherForecast } from "../Weather/WeatherForecast";
import { Amenities } from "../Amenities/Amenities";
import "./Locations.scss";

type Options = {
  value: string;
  label: string;
};
export function Locations(): JSX.Element {
  const [locations, setLocations] = useState<Array<Location>>();
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
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
        <p className="plan-a-trip__text">
          Where do you want to go Whale Spotting?
        </p>
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
          styles={{
            control: (styles) => ({
              ...styles,
              opacity: "0.8",
            }),
          }}
        />
      </section>
      {selectedLocationId &&
      latitude !== undefined &&
      longitude !== undefined ? (
        <section>
          <WeatherForecast latitude={latitude} longitude={longitude} />
        </section>
      ) : (
        <> </>
      )}
      {selectedLocationId ? (
        <section>
          <Amenities locationId={parseInt(selectedLocationId)} />
        </section>
      ) : (
        <> </>
      )}
    </div>
  );
}
