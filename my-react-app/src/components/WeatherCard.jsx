export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="mt-8 bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm text-center w-full max-w-sm">
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="Weather icon"
        className="mx-auto"
      />
      <p className="text-5xl font-bold">{Math.round(weather.temp)}°C</p>
      <p className="capitalize text-lg mt-1">{weather.condition}</p>

      <div className="mt-4 text-sm text-gray-200">
        📍 <span className="font-semibold">Lat:</span> {weather.lat.toFixed(2)}° |{" "}
        <span className="font-semibold">Lon:</span> {weather.lon.toFixed(2)}°
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="bg-white/20 p-3 rounded-lg">
          <p className="font-semibold">Feels Like</p>
          <p>{Math.round(weather.feelsLike)}°C</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <p className="font-semibold">Humidity</p>
          <p>{weather.humidity}%</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg col-span-2">
          <p className="font-semibold">Wind Speed</p>
          <p>{weather.wind} m/s</p>
        </div>
      </div>
    </div>
  );
}
