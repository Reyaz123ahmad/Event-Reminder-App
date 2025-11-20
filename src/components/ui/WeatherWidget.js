import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

const WeatherWidget = () => {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_KEY;
      console.log("API_URL:", process.env.REACT_APP_API_URL);
      console.log("WEATHER_KEY:", API_KEY);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      const mappedWeather = {
        temperature: data.main.temp,
        condition: data.weather[0].main.toLowerCase(),
        city: data.name
      };

      setWeather(mappedWeather);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
  }, [city]); 

  const getWeatherIcon = (condition) => {
    switch (condition) {

      case "clear":
        
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "snow":
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white"
    >
      
      <div className="mb-4">
        <input
          type="text"
          value={city}

          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="px-3 py-2 rounded text-black"
        />
        <button
          onClick={fetchWeather}
          className="ml-2 px-3 py-2 bg-blue-500 text-white rounded"
        >
          Get Weather
        </button>
      </div>

      {loading ? (
        <div>Loading weather...</div>
      ) : weather ? (

        <div className="flex items-center justify-between">
          <div>

            <p className="text-sm opacity-80">{weather.city}</p>
            <p className="text-2xl font-bold">{weather.temperature}°C</p>
          </div>
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.condition)}
            <span className="capitalize">{weather.condition}</span>
          </div>
        </div>
      ) : (
        <div>Weather data not available</div>
      )}
    </motion.div>
  );
};

export default WeatherWidget;
