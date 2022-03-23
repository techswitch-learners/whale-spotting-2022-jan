import React from "react";


export async function getWeather() {
    // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=7450f3d38f5f3798e7a23a903f445bf6`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=51.50853&lon=-0.12574&appid=7450f3d38f5f3798e7a23a903f445bf6`;
    const data = await fetch(url);
    const weather = await data.json();
  
    if (!data.ok) {
      throw new Error(weather.error_message);
    }
  
    return weather;
  }
  