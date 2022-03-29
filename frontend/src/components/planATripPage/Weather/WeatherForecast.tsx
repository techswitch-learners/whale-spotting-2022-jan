import React, { useEffect, useState } from "react";
import { getWeather } from "../../../clients/weatherClient";
import "./WeatherForecast.scss";

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
          temp: Math.floor(day.temp.day - 273.15),
          description: day.weather[0].description,
          icon: day.weather[0].icon,
        }))
      );
    });
  }, [latitude, longitude]);

  if (!weather) {
    return <section>Loading...</section>;
  }

  return (
    <section className="get-weather">
      <h1>5 day Weather Forecast</h1>
      <ul className="weather">
        {weather?.slice(0, 5).map((w, i) => (
          <li className="weather__list" key={i}>
            {/* {w.temp}&#176; °C
            <img
              src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
            ></img>
            <p> Expect {w.description}.</p> */}
            <div className="card weather__card">
              <img
                src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                className="card-img-top weather_card_img"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{w.temp}&#176; °C</h5>
                <p className="weather_card-text"> Expect {w.description}.</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
