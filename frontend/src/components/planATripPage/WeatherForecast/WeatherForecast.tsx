import React, { useEffect, useState } from "react";
import { getWeather } from "../../../clients/weatherClient";

type Weather = {
  temp: number;
  description: string;
  icon: string;
};
export function WeatherForecast({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): JSX.Element {
  const [weather, setWeather] = useState<Array<Weather>>();
  useEffect(() => {
    getWeather(latitude, longitude).then((response) => {
      setWeather(
        response.daily.map((day) => ({
          temp: day.temp.day,
          description: day.weather[0].description,
          icon: day.weather[0].icon,
        }))
      );
    });
  }, []);

  if (!weather) {
    return <section>Loading...</section>;
  }

  return (
    <section className="get-weather">
      <h1>5 day Weather Forecast</h1>
      <ol className="weather">
        {weather?.map((w, i) => (
          <li key={i}>
            {w.temp}
            {w.description}
            {w.icon}
          </li>
        ))}
      </ol>
    </section>
  );
}
