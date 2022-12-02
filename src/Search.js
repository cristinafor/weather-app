import React, { useState } from "react";
import axios from "axios";
export default function Search() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(false);
  const [weather, setWeather] = useState(null);

  function displayWeather(response) {
    setResult(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: [Math.round(response.data.wind.speed)],
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3a94f3778290bfeee61278505dbbe51d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city..." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (result) {
    return (
      <div className="form">
        {form}
        <h2>{city}</h2>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Wind: {weather.wind} km/h</li>
          <li>Humidity: {weather.humidity}%</li>
        </ul>
        <img src={weather.icon} alt="Weather Icon" />
      </div>
    );
  } else {
    return form;
  }
}
