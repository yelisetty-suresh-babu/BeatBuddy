
import React, { useState, useRef, useEffect } from "react";
import play from "../../public/play.png";
import pause from "../../public/pause.png";
import forward from "../../public/forward-button.png";
import backward from "../../public/previous.png";

const AudioPlayer = ({ src, next, prev, isplay, name }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isplay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(NaN); 
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // When src changes, reset currentTime and optionally play if isplay is true
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isplay) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [src, isplay]);

  useEffect(() => {
    if (isplay && audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isplay]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleNext = () => {

  };

  const handlePrevious = () => {

  };

  const handleLoopToggle = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !audioRef.current.loop;
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white/20 backdrop-blur-lg shadow-2xl rounded-t-2xl px-4 py-2 flex flex-col items-center border-t border-white/20">
      <audio
        autoPlay={isplay}
        onPlaying={() => setIsPlaying(true)}
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={next}
      />
      <h1 className="text-base font-bold text-[#fff18a] mb-1 truncate w-full text-center drop-shadow">{name ? name.replace(/\.[^/.]+$/, "") : ""}</h1>
      <div className="flex flex-col w-full items-center mb-1">
        <input
          type="range"
          min={0}
          max={isNaN(duration) ? 0 : duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-[#eab308] h-1.5 rounded-lg appearance-none bg-white/30 focus:outline-none focus:ring-2 focus:ring-[#eab308]"
        />
        <div className="flex justify-between w-full text-xs text-white mt-0.5">
          <span>{`${String(Math.floor(currentTime / 60)).padStart(2, "0")}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`}</span>
          <span>{`${isNaN(duration) ? "00:00" : `${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(Math.floor(duration % 60)).padStart(2, "0")}`}`}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 my-1">
        <button
          onClick={() => {
            setIsPlaying(false);
            prev();
          }}
          className="bg-white/30 hover:bg-[#eab308]/80 p-2 rounded-full shadow-lg transition-all border border-white/20"
        >
          <img src={backward} className="w-5 h-5" alt="Previous" />
        </button>
        <button
          onClick={togglePlay}
          className="bg-[#eab308] hover:bg-[#facc15] p-4 rounded-full shadow-xl transition-all border-2 border-white/30 flex items-center justify-center"
        >
          {isPlaying ? (
            <img src={pause} className="w-6 h-6" alt="Pause" />
          ) : (
            <img src={play} className="w-6 h-6" alt="Play" />
          )}
        </button>
        <button
          onClick={() => {
            setIsPlaying(false);
            next();
          }}
          className="bg-white/30 hover:bg-[#eab308]/80 p-2 rounded-full shadow-lg transition-all border border-white/20"
        >
          <img src={forward} className="w-5 h-5" alt="Next" />
        </button>
      </div>
      <div className="flex items-center justify-between w-full mt-1">
        <button
          onClick={handleLoopToggle}
          className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all border border-white/20 shadow ${isLooping ? "bg-[#eab308] text-slate-900" : "bg-white/30 text-white hover:bg-[#eab308]/80 hover:text-slate-900"}`}
        >
          {isLooping ? "Looping" : "Loop"}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-[#eab308] h-1.5 rounded-lg appearance-none bg-white/30 focus:outline-none focus:ring-2 focus:ring-[#eab308] ml-4"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
