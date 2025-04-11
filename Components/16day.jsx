import React, { useState, useEffect } from 'react';

function SixteenDayForecast() {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('New York');
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

  useEffect(() => {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&days=16`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setForecast(data.data);
          setFilteredForecast(data.data); // Set the filtered data initially to all
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching weather forecast:', error);
        setLoading(false);
      });
  }, [city, apiKey]);

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

  const convertToLocalTime = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div>Loading forecast...</div>;
  }

  return (
    <div className = "contentDiv">
      <div className = "content">
        <h2 className = "title"> 16-Day Weather Forecast for {city}</h2>

        <select className = "location" onChange={(e) => setCity(e.target.value)} value={city}>
          {cityList.map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>

        <select className = "filter" onChange={handleFilterChange} value={filterCategory}>
          {filter.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className = "forecastContainer">
          <div className = "weatherHeader">
            <div className = "weatherData"> Date </div>
            <div className = "weatherData"> Location </div>
            <div className = "weatherData"> Temperature </div>
            <div className = "weatherData"> Weather </div>
            <div className = "weatherData"> Humidity </div>
            <div className = "weatherData"> Sunrise </div>
            <div className = "weatherData"> Sunset </div>
          </div>

          {filteredForecast.map((weatherData, index) => (
            <div key={index} className = "weatherRow">
              <div className = "weatherData"> {new Date(weatherData.valid_date).toLocaleDateString()}</div>
              <div className = "weatherData"> {city}</div>
              <div className = "weatherData"> {Math.round(weatherData.temp * 9 / 5 + 32)}°F </div>
              <div className = "weatherData"> {weatherData.weather.description} </div>
              <div className = "weatherData"> {weatherData.rh}% </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SixteenDayForecast;