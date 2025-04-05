import React, { useState, useEffect } from 'react';
import './App.css'
import WeatherInfo from '../Components/WeatherInfo';

const App = () => {
  return (
    <div className="container">
      <div className="logoContainer">
        <img src="logo.webp" className="logoImg" alt="logo" />
      </div>
      <WeatherInfo/>
    </div>
  );
};

export default App;