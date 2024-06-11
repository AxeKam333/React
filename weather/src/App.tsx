import { useState } from "react";
import "./App.css";

import { fetchWeatherApi, WeatherApiResponse } from "openmeteo";
import descriptions from "./descriptions.json";

const params = {
  latitude: 52.52,
  longitude: 13.41,
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
};
const url = "https://api.open-meteo.com/v1/forecast";

let responses: WeatherApiResponse[] | undefined;
try {
  responses = await fetchWeatherApi(url, params);
} catch (error) {
  console.log(error);
}

function App() {
  if (responses !== undefined) {
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
      },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      console.log(
        weatherData.daily.time[i].toISOString(),
        weatherData.daily.weatherCode[i],
        weatherData.daily.temperature2mMax[i],
        weatherData.daily.temperature2mMin[i]
      );
    }

    return (
      <>
        <h1>Weather app</h1>
        <div className="card">
          {responses !== undefined &&
            range(0, weatherData.daily.time.length, 1).map((i) => {
              const id = weatherData.daily.weatherCode[i];
              let pngUrl, title;
              if (descriptions.hasOwnProperty(id.toString())) {
                pngUrl = descriptions[id].day.image;
                title = descriptions[id].day.description;
              } else {
                pngUrl = "";
                title = "";
              }
              return (
                <div key={i}>
                  <p>
                    {weatherData.daily.time[i].getDate()}/
                    {weatherData.daily.time[i].getMonth() + 1}
                  </p>
                  <h2>
                    {weatherData.daily.temperature2mMin[i].toFixed(1)}°-
                    {weatherData.daily.temperature2mMax[i].toFixed(1)}°
                  </h2>
                  {pngUrl && <img src={pngUrl}></img>}
                  <p>{title}</p>
                </div>
              );
            })}
        </div>
      </>
    );
  }
  return (
    <>
      <h2>Error fetching data!</h2>
    </>
  );
}

export default App;
