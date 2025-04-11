import React, { useState, useEffect } from 'react';

function WeatherInfo() {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('No Filter');
  const [filteredForecast, setFilteredForecast] = useState([]);

  const apiKey = import.meta.env.VITE_APP_ACCESS_KEY;

  const cityList = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'Austin'
  ];

  const filter = [
    'No Filter', 'Clear','Clouds','Rain', 'Snow', 'Thunderstorms', 'Sleet', 'Smoke', 'Mist', 'Flurries'
  ];

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  useEffect(() => {
    if (filterCategory === 'No Filter') {
      setFilteredForecast(forecast);
    } else {
      const filteredData = forecast.filter((weatherData) => 
        weatherData.weather.description.toLowerCase().includes(filterCategory.toLowerCase())
      );
      setFilteredForecast(filteredData);
    }
  }, [filterCategory, forecast]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          setWeatherData(data.data[0]);
        } else {
          console.error('No weather data found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&days=16`);
        const data = await response.json();
        if (data && data.data) {
          setForecast(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city]);

  const convertToLocalTime = (timestamp) => {
    if (!timestamp) return '--:--';
    const date = new Date(timestamp * 1000); // Convert timestamp (seconds) to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading || !weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="quickInfo">
        <div className="infoBox">
          <p className="headline">📍 {weatherData.city_name} </p>
          <p className="extras">{weatherData.state_code}, {weatherData.country_code}</p>
          <ul className="extras">
            <li>Sunrise: {weatherData.sunrise} UTC</li>
            <li>Sunset: {weatherData.sunset} UTC</li>
          </ul>
        </div>

        <div className="infoBox">
          <p className="headline"><strong>🌡️ Currently: {Math.round(weatherData.temp * 9 / 5 + 32)}°F</strong></p>
          <ul className="extras">
            <li>Feels like: {Math.round(weatherData.app_temp * 9 / 5 + 32)}°F</li>
            <li>Wind Speed: {Math.round(weatherData.wind_spd * 2.237)} mph</li>
            <li>Humidity: {weatherData.rh}%</li>
          </ul>
        </div>

        <div className="infoBox">
          <img src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`} alt={weatherData.weather.description} className="headline" />
          <p className="headline">{weatherData.weather.description}</p>
        </div>
      </div>

      <div className="contentDiv">
        <div className="content">
          <h2 className="title">Weather Information for {city}</h2>

          <select className="location" onChange={(e) => setCity(e.target.value)} value={city}>
            {cityList.map((cityName, index) => (
              <option key={index} value={cityName}>{cityName}</option>
            ))}
          </select>

          <select className="filter" onChange={handleFilterChange} value={filterCategory}>
            {filter.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          <div className="forecastContainer">
            <div className="weatherHeader">
              <div className="weatherData">Date</div>
              <div className="weatherData">Location</div>
              <div className="weatherData">Temperature</div>
              <div className="weatherData">Weather</div>
              <div className="weatherData">Humidity</div>
              <div className="weatherData">Sunrise</div>
              <div className="weatherData">Sunset</div>
            </div>

            {filteredForecast.map((day, index) => (
              <div className="weatherRow" key={index}>
                <div className="weatherData">{new Date(day.valid_date).toLocaleDateString()}</div>
                <div className="weatherData">{city}</div>
                <div className="weatherData">{Math.round(day.temp * 9 / 5 + 32)}°F</div>
                <div className="weatherData">{day.weather.description}</div>
                <div className="weatherData">{day.rh}%</div>
                <div className="weatherData">{weatherData.sunrise} UTC </div>
                <div className="weatherData">{weatherData.sunset} UTC </div> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherInfo;
