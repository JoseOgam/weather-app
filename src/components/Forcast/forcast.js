import React, { useState } from "react";
import Conditions from "../Conditions/condition";
import classes from "./Forecast.module.css";

const Forcast = () => {
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [responseObj, setResponseObj] = useState({});
  const uriEncodedCity = encodeURIComponent(city);
  var getForecast = (e) => {
    e.preventDefault();
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "5609c6b61fmsh712758e3c1c2ff6p176cc7jsn14cf0bd40367",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Enter City"
          maxLength="50"
          value={city}
          className={classes.textInput}
          onChange={(e) => setCity(e.target.value)}
        />
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            className={classes.textInput}
            onChange={(e) => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            className={classes.textInput}
            onChange={(e) => setUnit(e.target.value)}
          />
          Celcius
        </label>
        <button className={classes.Button} type="submit">
          Get Forecast
        </button>
      </form>
      <Conditions responseObj={responseObj} />
    </div>
  );
};

export default Forcast;
