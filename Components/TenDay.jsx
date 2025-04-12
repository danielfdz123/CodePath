import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../src/index.css';

function TenDay() {
  const location = useLocation();
  const [city, setCity] = useState(location.state?.city || 'New York');
  const [search, setSearch] = useState('');
  const [forecast, setForecast] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_APP_ACCESS_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
        const data = await response.json();
        if (data?.data?.length > 0) {
          setWeatherData(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchForecast = async () => {
      try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&days=16`);
        const data = await response.json();
        const tenDayForecast = data.data.slice(1, 11); // skip today
        setForecast(tenDayForecast);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };

    fetchWeatherData();
    fetchForecast();
  }, [city]);

  if (!weatherData || forecast.length === 0) return <div>Loading forecast...</div>;

  return (
    <>
      <div className="headerContainer">
        <div className="logoContainer">
          <img src="logo.webp" className="logoImg" alt="logo" />
        </div>

        <div className="search">
          <p className="searchLabel"> 🔍 Enter a City:
            <input
              type="text"
              className="searchBar"
              placeholder="Enter city name..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="searchButton"
              onClick={() => {
                if (search.trim()) setCity(search.trim());
              }}
            >
              Search!
            </button>
          </p>
        </div>

        <div className="quickInfo">
          <div className="infoBox">
            <div className="iconStuff">
              <img src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`} className="weatherIcon" />
              <p className="extras">{weatherData.weather.description}</p>
            </div>
            <div className="weatherInfo">
              <p className="headline">📍{weatherData.city_name}, {weatherData.state_code}</p>
              <p className="extras">• Feels like: {Math.round(weatherData.app_temp * 9 / 5 + 32)}°F</p>
            </div>
          </div>

          <div className = "infoBox">
          <div className = "details">
            <p>
              🌡️ <strong>High / Low:</strong> {Math.round(forecast[0]?.max_temp * 9/5 + 32)}° / {Math.round(forecast[0]?.min_temp * 9/5 + 32)}° <br/>
              💧 <strong>Humidity:</strong> {weatherData.rh}% <br/>
              🌡️ <strong>Pressure:</strong> {weatherData.pres} in <br/>
              👁️ <strong>Visibility:</strong> {weatherData.vis} mi
            </p>
          </div>
    
          <div className = "details">
            <p>
              🌬️ <strong>Wind:</strong> {weatherData.wind_cdir} {Math.round(weatherData.wind_spd * 2.237)} mph <br/>
              💦 <strong>Dew Point:</strong> {Math.round(weatherData.dewpt)}° <br/>
              ☀️ <strong>UV Index:</strong> {weatherData.uv} of 11 <br/>
              🌕 <strong>Moon Phase:</strong> {forecast[0]?.moon_phase} <br/>
            </p>
          </div>
          </div>

            <div className="buttonBox">
              <button className="navButton" onClick={() => navigate('/10day')}> 10 Day Forecast </button>
              <button className="navButton" onClick={() => navigate('/weather')}> View Maps </button>
            </div>
          


        </div>
      </div>
      <div className="contentDiv">
        <div className="content">
          <h2 className="title">10-Day Forecast for {city}</h2>
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

          {forecast.map((day, index) => (
            <div className="weatherRow" key={index}>
              <div className="weatherData">{new Date(day.valid_date).toLocaleDateString()}</div>
              <div className="weatherData">{city}</div>
              <div className="weatherData">{Math.round(day.temp * 9 / 5 + 32)}°F</div>
              <div className="weatherData">{day.weather.description}</div>
              <div className="weatherData">{day.rh}%</div>
              <div className="weatherData">{weatherData.sunrise} UTC</div>
              <div className="weatherData">{weatherData.sunset} UTC</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}

export default TenDay;