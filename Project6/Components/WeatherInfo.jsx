import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import '../src/index.css';

import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function WeatherInfo() {
  const location = useLocation();
  const [city, setCity] = useState(() => {
    return location.state?.city || localStorage.getItem("lastCity") || "New York";
  });
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);

  const apiKey = import.meta.env.VITE_APP_ACCESS_KEY;

  useEffect(() => {
    if (city) localStorage.setItem("lastCity", city);
  }, [city]);
  
  useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
          const data = await response.json();
          if (data?.data?.length > 0) {
            const weather = data.data[0];
            setWeatherData(weather);
            setLat(weather.lat);
            setLon(weather.lon);
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
                <button className="navButton" onClick={() => navigate('/10day', { state: { city } })}> 10 Day Forecast </button>
                <button className="navButton"  onClick={() => navigate('/weather', { state: { city } })}> View Maps </button>
              </div>
          </div>
        </div>

        {/* STUFF OUTSIDE OF THE CONSTANT NAV BAR; EVERYTHING BELOW HERE IS NEW STUFF */}
        <div className="contentDiv">
        <div className="content">
          <h2 className="title">🌦️ Weather Visuals for {city}</h2>
          <div className="visualsLayout">
            <div className="radarSection">
              <iframe
                src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=100%&height=450&zoom=7&level=surface&overlay=radar`}
                width="100%"
                height="450"
                frameBorder="0"
                title="Live Radar"
                allowFullScreen 
              />
            </div>
            <div className = "chartsColumn">
              <div className = "chartRow" onClick={() => setModalContent(
                <Line 
                  data={{
                  labels: forecast.map(day => day.valid_date),
                  datasets: [{
                    label: 'Rain (mm)',
                      data: forecast.map(day => day.precip),
                      borderColor: 'skyblue',
                      backgroundColor: 'rgba(135,206,250,0.2)',
                      tension: 0.4,
                      fill: true
                    }]
                  }} />
                )
              }>
                <h4> 🌧️ Accumulation (mm) </h4>
                <div className = "chartBox">
                  <Line
                    data={{
                      labels: forecast.map(day => day.valid_date),
                      datasets: [{
                        label: 'Rain (mm)',
                        data: forecast.map(day => day.precip),
                        borderColor: 'skyblue',
                        backgroundColor: 'rgba(135,206,250,0.2)',
                        tension: 0.4,
                        fill: true,
                      }]
                    }}
                    options={{ responsive: true, plugins: { legend: { display: false } } }}
                  />
                </div>
              </div>

              <div className = "chartRow" onClick={() =>
                setModalContent(
                  <Line data={{
                  labels: forecast.map(day => day.valid_date),
                    datasets: [{
                      label: 'Temp (°F)',
                      data: forecast.map(day => Math.round(day.temp * 9 / 5 + 32)),
                      borderColor: 'tomato',
                      backgroundColor: 'rgba(255, 99, 71, 0.2)',
                      tension: 0.4,
                      fill: true
                    }]
                  }} />
                )
              }>
                <h3>🌡️ Temperature (°F) </h3>
                <div className="chartBox">
                  <Line
                    data={{
                    labels: forecast.map(day => day.valid_date),
                    datasets: [{
                      label: 'Temp (°F)',
                      data: forecast.map(day => Math.round(day.temp * 9 / 5 + 32)),
                      borderColor: 'tomato',
                      backgroundColor: 'rgba(255, 99, 71, 0.2)',
                      tension: 0.4,
                      fill: true,
                      }]
                    }}
                    options={{ responsive: true, plugins: { legend: { display: false } } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalContent && (
        <div className = "modal" onClick={() => setModalContent(null)}>
          <div className = "detailedCharts" onClick={(e) => e.stopPropagation()}>
            <button className = "closeModal" onClick={() => setModalContent(null)}>✖</button>
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherInfo;
