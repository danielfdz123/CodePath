import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherInfo from '../Components/WeatherInfo';
import TenDay from '../Components/TenDay';
import Home from '../Components/Home';
import './App.css';
import './index.css';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherInfo />} />
          <Route path="/10day" element={<TenDay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
