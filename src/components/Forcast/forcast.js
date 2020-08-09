import React, { useState } from "react";

const Forcast = () => {
  let [responseObj, setResponseObj] = useState({});
  var getForecast = () => {
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=kisumu",
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
      <div>{JSON.stringify(responseObj)}</div>
      <button onClick={getForecast}>Get Forecast</button>
    </div>
  );
};

export default Forcast;
