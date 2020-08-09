import React, { useState } from "react";
import Conditions from "../Conditions/condition";
import classes from "./Forecast.module.css";

const Forcast = () => {
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  let [responseObj, setResponseObj] = useState({});
  const uriEncodedCity = encodeURIComponent(city);
  var getForecast = (e) => {
    e.preventDefault();
    if (city.length === 0) {
      return setError(true);
    }

    // Clear state in preparation for new data
    setError(false);
    setResponseObj({});

    setLoading(true);

    let uriEncodedCity = encodeURIComponent(city);
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
        if (response.cod !== 200) {
          throw new Error();
        }
        setResponseObj(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
    // setCity("");
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
            onChange={(e) => setUnit(e.target.value)}
          />
          Celcius
        </label>
        <button className={classes.Button} type="submit">
          Get Forecast
        </button>
      </form>
      <Conditions responseObj={responseObj} error={error} loading={loading} />
    </div>
  );
};

export default Forcast;
