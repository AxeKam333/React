import { useState } from "react";
import "./App.css";

import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 52.39,
  longitude: 16.91,
  daily: ["temperature_2m_max", "temperature_2m_min"],
  timezone: "Europe/Berlin",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const response = responses[0];

const utcOffsetSeconds = response.utcOffsetSeconds();

const daily = response.daily()!;

const weatherData = {
  daily: {
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2mMax: daily.variables(0)!.valuesArray()!,
    temperature2mMin: daily.variables(1)!.valuesArray()!,
  },
};

for (let i = 0; i < weatherData.daily.time.length; i++) {
  console.log(
    weatherData.daily.time[i].toISOString(),
    weatherData.daily.temperature2mMax[i],
    weatherData.daily.temperature2mMin[i]
  );
}

function App() {
  return (
    <>
      <h1>Weather app</h1>
      <div className="card">
        {range(0, weatherData.daily.time.length, 1).map((i) => (
          <div key={i}>
            <p>
              {weatherData.daily.time[i].getDate()}/
              {weatherData.daily.time[i].getMonth() + 1}
            </p>
            <h2>
              {weatherData.daily.temperature2mMin[i].toFixed(0)}°-
              {weatherData.daily.temperature2mMax[i].toFixed(0)}°
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
