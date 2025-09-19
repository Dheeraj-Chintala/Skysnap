import { useState } from "react";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaTachometerAlt,
  FaWind,
  FaTint,
   FaGithub ,
   FaGlobe 
} from "react-icons/fa";
import { WiThermometer } from "react-icons/wi";

function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const base="https://api.openweathermap.org/data/2.5/";


  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searching = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      fetch(`${base}weather?q=${search}&units=metric&APPID=${apiKey}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setSearch("");
        });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-4 sm:p-6"
      style={{ backgroundImage: "url('/skyback.jpg')" }}
    >
         <nav className="absolute top-4 right-4 flex justify-end items-center gap-4 p-2 md:p-4 z-50  ">
        <a
          href="https://github.com/Dheeraj-Chintala"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-transform hover:scale-110"
        >
          <FaGithub className="w-6 h-6" />
        </a>
        <a
          href="https://dheerajkumar.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-transform hover:scale-110"
        >
          <FaGlobe className="w-6 h-6" />
        </a>
      </nav>
    {!weather.main && (
  <h1 className="text-3xl sm:text-5xl font-bold text-white text-center ">
    S K Y &nbsp; S N A P
  </h1>
)}
<div className="flex flex-col sm:flex-row w-full max-w-md sm:max-w-xl mb-6 mt-16 sm:mt-20">
        <input
          type="search"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searching}
          className="px-4 py-3 flex-1 rounded-xl  border border-white bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 backdrop-blur-md"
        />  
       
      </div>

      {typeof weather.main !== "undefined" ? (
        <div className="w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden relative bg-black/10 backdrop-blur-md border border-white/30 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 flex flex-col justify-center items-center mb-4 sm:mb-0">
              <div className="text-4xl sm:text-6xl font-bold mb-2">
                {weather.main.temp}°C
              </div>
              <div className="text-lg sm:text-xl capitalize opacity-80 mb-1 text-center">
                {weather.weather[0].description}
              </div>
              <div className="text-2xl sm:text-3xl font-semibold">{weather.name}</div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-white/10 rounded-xl p-4 sm:p-6">
              <WeatherTile
                icon={<FaWind size={28} />}
                label="Wind Speed"
                value={`${weather.wind.speed} m/s`}
              />
              <WeatherTile
                icon={<FaTint size={28} />}
                label="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <WeatherTile
                icon={<FaTemperatureLow size={28} />}
                label="Min Temp"
                value={`${weather.main.temp_min}°C`}
              />
              <WeatherTile
                icon={<FaTemperatureHigh size={28} />}
                label="Max Temp"
                value={`${weather.main.temp_max}°C`}
              />
              <WeatherTile
                icon={<FaTachometerAlt size={28} />}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
              />
              <WeatherTile
                icon={<WiThermometer size={32} />}
                label="Feels Like"
                value={`${weather.main.feels_like}°C`}
              />
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-lg text-gray-200 mt-6">
          Search for a major city to get started 
        </h3>
      )}
    </div>
  );
}

function WeatherTile({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white/10 rounded-xl p-3 hover:scale-105 transform transition">
      <div className="text-sky-300">{icon}</div>
      <div className="text-xl sm:text-2xl font-semibold mt-1 sm:mt-2">{value}</div>
      <p className="text-xs sm:text-sm opacity-70 text-center">{label}</p>
    </div>
  );
}

export default App;
