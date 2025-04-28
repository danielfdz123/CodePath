import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <>
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
            <button className="searchButton" 
                onClick={() => {
                if (search.trim()) {
                    navigate('/10day', { state: { city: search.trim(), timestamp: Date.now() } });
                    }
                }}>
                Search!
            </button>
        </p>
    </div>
    <div className="quickInfo">
        <div className="infoBox clickable" role="button">
            <div className="weatherInfo">
                <p className="headline">📍Search a City to Start!</p>
            </div>
        </div>
    </div>
    
    <div className = 'contentDiv'>
        <div className="content">
            <h1 className = 'headline'> Welcome to the Weather App!</h1>
            <ul>
                <li> Use the search bar above to look up the weather in any city! </li>
                <li> Click the logo on the top left to return to this page at any time! </li>
            </ul>
        </div> 
    </div>
    </>
  );
};

export default Home;
