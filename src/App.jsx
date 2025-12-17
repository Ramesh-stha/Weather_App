import React, { useContext } from "react";
import { AppContext } from "./api/WeatherContext";

const App = () => {
  const { weather, loading, error, city, setCity, getWeather } =
    useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) getWeather(city);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 p-4">
      {/* App Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
        Weather App
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-6"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 cursor-pointer rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Search
        </button>
      </form>

      {/* Loading / Error */}
      {loading && (
        <p className="text-white text-lg animate-pulse">Loading...</p>
      )}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Weather Card */}
      {!error && weather && (
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-6 shadow-xl w-full max-w-md text-center mt-4 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
          <p className="text-xl mb-1">🌡 Temp: {weather.main.temp} °C</p>
          <p className="capitalize mb-1">
            ☁ Weather: {weather.weather[0].description}
          </p>
          <p className="mb-2">💨 Wind: {weather.wind.speed} m/s</p>
          <p className="text-sm text-gray-600">
            Humidity: {weather.main.humidity}%
          </p>
        </div>
      )}
    </section>
  );
};

export default App;
