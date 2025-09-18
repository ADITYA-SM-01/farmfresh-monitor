import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";

const api = {
  key: "c7f21f1d0e3e88765228e0f549b19aa5",
  url: "https://api.openweathermap.org/data/2.5/weather",
};

type WeatherData = {
  name: string;
  sys: { country: string; sunrise?: number; sunset?: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  wind: { speed: number; deg?: number };
};

const kelvinToCelsius = (k: number) => +(k - 273.15).toFixed(1);
const mpsToKmph = (m: number) => +(m * 3.6).toFixed(1);

interface WeatherWidgetProps {
  defaultCity?: string;
  onNavigate: (page: string) => void;
}

export default function WeatherWidget({
  defaultCity = "coimbatore",
  onNavigate,
}: WeatherWidgetProps) {
  const [city, setCity] = useState(defaultCity);
  const [q, setQ] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${api.url}?q=${encodeURIComponent(cityName)}&appid=${api.key}`
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to fetch weather");
      }
      const result = (await res.json()) as WeatherData;
      setData(result);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      setCity(q.trim());
      setQ("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-orange-50 p-6">

      <div className="w-full max-w-2xl">
        {data && <WeatherBackground condition={data.weather[0].main} />}
        {/* Weather card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/50">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="mb-4 px-4 py-2 flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>

          {/* Top: Logo + Search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C13.7 6 18 9 18 13c0 3-2.5 5-6 7-3.5-2-6-4-6-7 0-4 4.3-7 6-11z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Weather</h3>
                <p className="text-xs text-gray-500">
                  Realtime local weather & eco hints
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search city..."
                className="px-3 py-2 border rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-sm font-medium shadow hover:scale-105 transition"
              >
                Go
              </button>
            </form>
          </div>

          {/* Weather content */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <svg
                className="animate-spin h-8 w-8 text-primary"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 font-medium">Error</p>
              <p className="text-sm text-gray-600 mt-2">{error}</p>
              <div className="mt-4">
                <button
                  onClick={() => fetchWeather(city)}
                  className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : data ? (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {data.name}, {data.sys.country}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {data.weather[0].main} • {data.weather[0].description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt={data.weather[0].description}
                      className="w-20 h-20"
                    />
                    <div className="text-right">
                      <div className="text-4xl font-bold text-gray-900">
                        {kelvinToCelsius(data.main.temp)}°C
                      </div>
                      <div className="text-sm text-gray-500">
                        Feels like {kelvinToCelsius(data.main.feels_like)}°C
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                  <p className="text-xs text-gray-500">Humidity</p>
                  <p className="font-medium text-gray-900">
                    {data.main.humidity}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <p className="text-xs text-gray-500">Wind</p>
                  <p className="font-medium text-gray-900">
                    {mpsToKmph(data.wind.speed)} km/h
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
                  <p className="text-xs text-gray-500">Pressure</p>
                  <p className="font-medium text-gray-900">
                    {data.main.pressure} hPa
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
                  <p className="text-xs text-gray-500">Updated</p>
                  <p className="font-medium text-gray-900">
                    {lastUpdated ? lastUpdated.toLocaleTimeString() : "-"}
                  </p>
                </div>
              </div>

              {/* Eco hint */}
              <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-white to-green-50 shadow-inner">
                <p className="text-sm text-gray-700">
                  <strong>Eco suggestion:</strong> {generateEcoHint(data)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Search a city to view weather
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Eco hints */
function generateEcoHint(data: WeatherData) {
  const w = data.weather[0].main.toLowerCase();
  const tempC = kelvinToCelsius(data.main.temp);

  if (w.includes("rain") || w.includes("drizzle")) {
    return "Carry a reusable umbrella or raincoat. Prefer protected packaging for deliveries.";
  }
  if (w.includes("snow")) {
    return "Cold conditions — consider insulated packaging for shipments and check delivery routes for safety.";
  }
  if (tempC > 30) {
    return "Hot day — avoid shipping perishable goods midday; use eco-packaging with heat protection.";
  }
  if (tempC < 5) {
    return "Very cold — avoid long transit for perishable items and notify buyers about possible delays.";
  }
  if (data.wind && data.wind.speed > 10) {
    return "Windy conditions — secure loose packaging and prefer local delivery options.";
  }
  return "Good weather — consider promoting local deliveries and pickup to reduce shipping emissions.";
}


/** Animated Background depending on condition */
function WeatherBackground({ condition }: { condition: string }) {
  condition = condition.toLowerCase();

  if (condition.includes("rain"))
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900">
        {/* Raindrops */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-0.5 h-8 bg-white/50 rounded"
            initial={{ y: -50 }}
            animate={{ y: "100vh" }}
            transition={{
              repeat: Infinity,
              duration: 1 + Math.random(),
              delay: Math.random() * 2,
            }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    );

  if (condition.includes("snow"))
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-200">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full shadow"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: "100vh", opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 3,
            }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    );

  if (condition.includes("clear"))
    return (
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-300"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "200% 200%" }}
      />
    );

  if (condition.includes("cloud"))
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-slate-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-20 bg-white/70 rounded-full blur-2xl"
            animate={{ x: ["-20%", "120%"] }}
            transition={{
              duration: 40 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 5,
            }}
            style={{ top: `${20 * i}%` }}
          />
        ))}
      </div>
    );

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-green-200 to-teal-400"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      style={{ backgroundSize: "200% 200%" }}
    />
  );
}