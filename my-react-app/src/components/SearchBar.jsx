import { Search, MapPin } from "lucide-react";

export default function SearchBar({ city, setCity, onSearch, onLocation }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full max-w-md bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden border border-white/30 shadow-lg">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-grow px-4 py-3 bg-transparent outline-none text-white placeholder-gray-300"
        />
        <button
          onClick={onSearch}
          className="bg-blue-700 hover:bg-blue-800 px-4 flex items-center justify-center transition"
        >
          <Search size={20} />
        </button>
      </div>

      <button
        onClick={onLocation}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition text-sm"
      >
        <MapPin size={16} /> Use My Location
      </button>
    </div>
  );
}
