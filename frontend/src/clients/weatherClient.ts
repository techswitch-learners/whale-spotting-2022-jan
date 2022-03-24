type WeatherResponse = {
  daily: {
    temp: { day: number };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
};
export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=7450f3d38f5f3798e7a23a903f445bf6&exclude=current,hourly,minutely,alerts`;
  const data = await fetch(url);
  const weather = await data.json();

  if (!data.ok) {
    throw new Error(weather.error_message);
  }

  return weather;
}
