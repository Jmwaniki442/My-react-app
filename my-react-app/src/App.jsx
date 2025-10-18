import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "27f2ac3a022c0a20a9ba544face76008"; 

  const handleSearch = () => {
    if (!city) return;
    fetchWeather(`q=${city}`);
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(`lat=${latitude}&lon=${longitude}`);
      },
      () => {
        setError("Unable to retrieve location");
        setLoading(false);
      }
    );
  };

  const fetchWeather = async (query) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast([]);

      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`
      );
      if (!resWeather.ok) throw new Error("City not found");
      const data = await resWeather.json();

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await resForecast.json();
      const dailyForecast = forecastData.list.filter((_, i) => i % 8 === 0);

      setWeather({
        name: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
        lat: data.coord.lat,
        lon: data.coord.lon,
      });
      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🌦 Weather App</h1>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        onLocation={handleLocation}
      />

      {loading && <p className="mt-6 text-lg animate-pulse">Fetching weather...</p>}
      {error && <p className="mt-6 text-red-200">{error}</p>}

      <WeatherCard weather={weather} />
      <ForecastCard forecast={forecast} />
    </div>
  );
}
