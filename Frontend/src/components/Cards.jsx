import React from "react";

function Cards({ name, artist, image2 }) {
  return (
    <div className="flex items-center justify-center animate-fade">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md shadow-xl rounded-2xl flex flex-col items-center gap-3 px-6 py-6 transition-transform hover:scale-105 border border-white/20">
        <img src={image2} alt="cover" className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-yellow-400/30 mb-2" />
        <div className="flex flex-col items-center w-full">
          <p className="text-xl font-extrabold text-white drop-shadow-sm mb-1 text-center" title={name}>{name}</p>
          <p className="text-sm text-white/80 mb-3 text-center" title={artist}>{artist}</p>
        </div>
        <button className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 font-bold px-4 py-2 rounded-lg shadow hover:from-yellow-300 hover:to-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60 mt-2">
          Download
        </button>
      </div>
    </div>
  );
}

export default Cards;
