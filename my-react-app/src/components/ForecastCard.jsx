export default function ForecastCard({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-10 w-full max-w-3xl">
      <h3 className="text-xl font-semibold mb-4 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {forecast.map((day, i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-xl text-center shadow-lg backdrop-blur-sm"
          >
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="icon"
              className="mx-auto"
            />
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="capitalize text-sm">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
