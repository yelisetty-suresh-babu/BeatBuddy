
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [val, setVal] = useState(true);
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };
  return (
    // <div className="w-full flex flex-col items-center bg-transparent backdrop-blur-md shadow-lg rounded-b-2xl py-5 md:py-6 mb-8 sticky top-0 z-40 gap-2 md:gap-4">
      <div className="flex items-center justify-between w-full max-w-5xl px-4 md:px-8 gap-4 p-5 mx-auto sticky top-0 z-40 bg-transparent backdrop-blur-md shadow-lg w-full">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-wider hover:scale-105 transition-transform">
          BeatBuddy
        </Link>
        {loc.pathname !== "/login" && (
          <nav className="flex gap-3 md:gap-6 items-center">
            <Link
              className={`px-3 md:px-4 py-2 rounded-full font-semibold transition-all text-base md:text-lg hover:bg-yellow-400/30 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${loc.pathname === "/" ? "bg-yellow-400/80 text-slate-900 shadow" : "text-white/90"}`}
              to="/"
            >
              Player
            </Link>
            <Link
              to="/download"
              className={`px-3 md:px-4 py-2 rounded-full font-semibold transition-all text-base md:text-lg hover:bg-yellow-400/30 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${loc.pathname === "/download" ? "bg-yellow-400/80 text-slate-900 shadow" : "text-white/90"}`}
            >
              Downloader
            </Link>
            <Link
              className={`px-3 md:px-4 py-2 rounded-full font-semibold transition-all text-base md:text-lg hover:bg-yellow-400/30 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 ${loc.pathname === "/recognize" ? "bg-yellow-400/80 text-slate-900 shadow" : "text-white/90"}`}
              to="/recognize"
            >
              Recognizer
            </Link>
          </nav>
        )}
        {loc.pathname !== "/login" && (
          <button
            onClick={logout}
            className="ml-2 md:ml-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 font-bold px-4 md:px-5 py-2 rounded-full shadow-md hover:scale-105 hover:from-yellow-300 hover:to-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
          >
            Logout
          </button>
        )}
      </div>
    // </div>
  );
}

export default Header;
