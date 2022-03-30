import React, { useEffect, useState } from "react";
import { getWeather } from "../../../clients/weatherClient";
import "./WeatherForecast.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

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
    <section className="planATrip">
      <h2 className="planATrip__sub-title">Weather Forecast</h2>
      <Carousel className="plantATrip__carousel">
        {weather?.slice(0, 5).map((w, i) => (
          <Carousel.Item className="plantATrip__carousel-item" key={i}>
            <h3 className="planATrip__capttion-title">Day {i + 1}</h3>
            <img
              className=" planATrip__icon  "
              src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
              alt={`slide ${i}`}
            />
            <Carousel.Caption>
              <h3 className="planATrip__capttion-title">{w.temp} °C</h3>
              <p className="planATrip__caption-text">{w.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
