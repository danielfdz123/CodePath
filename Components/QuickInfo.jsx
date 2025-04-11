import React, { useEffect, useState } from 'react';

function QuickInfo({ city, weatherData }) {
  if (!weatherData) {
    return <div className="quickInfo">Loading...</div>;
  }

  const { timezone, sunrise, sunset, weather } = weatherData;
  const iconUrl = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;

  const convertToLocalTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), hours, minutes));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZone: timezone });
  };

  return (
    <div className = "quickInfo">
      {/* LOCATION */}
      <div className = "infoBox">
        <p className = "headline"> 📍 {weatherData.city_name} </p>
        <p className = "extras"> {weatherData.state_code}, {weatherData.country_code} </p>
        <ul className = "extras">
          <li> Sunrise: {convertToLocalTime(sunrise)} </li>
          <li> Sunset: {convertToLocalTime(sunset)} </li>
        </ul>
      </div>

      {/* TEMPERATURE */}
      <div className = "infoBox">
        <p className = "headline"> <strong> 🌡️ Currently: {Math.round(weatherData.temp * 9 / 5 + 32)}°F </strong> </p>
        <ul className = "extras">
            {/* Changes from fahrenheit to celsius */}
          <li> Feels like: {Math.round(weatherData.app_temp * 9 / 5 + 32)}°F </li>
            {/* Changes from m/s to mph */}
          <li> Wind Speed: {Math.round(weatherData.wind_spd * 2.237)} mph </li>
          <li> Relative Humidity: {weatherData.rh}%</li>
        </ul>
      </div>

      {/* WEATHER */}
      <div className = "infoBox">
        <img src = {iconUrl} alt = {weather.description} className = "headline" />
        <p className = "headline"> {weather.description} </p>
      </div>
    </div>
  );
}

export default QuickInfo;