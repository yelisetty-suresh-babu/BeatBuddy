
import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [songs, setSongs] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isplay, setIsPlay] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://localhost:3000/songs")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSongs(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return; 
        }

        const response = await fetch("http://localhost:3000/songs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }

        const data = await response.json();

        setSongs(data);
        // Auto-select the first song if available
        if (data.length > 0) {
          setTrackIndex(0);
          setIsPlay(false);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickPrevious = () => {
    stopAndPlayNewTrack((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const handleClickNext = () => {
    stopAndPlayNewTrack((prevIndex) =>
      prevIndex < songs.length - 1 ? prevIndex + 1 : 0
    );
  };

  const stopAndPlayNewTrack = (updateTrackIndex) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTrackIndex(updateTrackIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center justify-start py-8 px-2">
      <div className="w-full max-w-2xl mx-auto">
        <ul className="flex flex-col gap-4">
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex justify-between items-center w-full bg-white/10 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 transition-transform hover:scale-[1.03] hover:bg-white/20 cursor-pointer border border-white/10"
              onClick={() => {
                setTrackIndex(index);
                setIsPlay(true);
              }}
            >
              <p className="text-[#fff18a] font-semibold text-lg truncate max-w-[70%]">{song.name.slice(0, -4)}</p>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setTrackIndex(index);
                  setIsPlay(false); // force toggle
                  setTimeout(() => setIsPlay(true), 0); // force play
                }}
                className="ml-4 bg-[#eab308] text-slate-900 font-bold px-5 py-2 rounded-full shadow-md hover:bg-[#facc15] transition-colors focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:ring-offset-2"
              >
                ▶ Play
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AudioPlayer
        ref={audioRef}
        src={`http://localhost:3000/songs/${songs[trackIndex]?.name}`}
        next={handleClickNext}
        prev={handleClickPrevious}
        isplay={isplay}
        name={songs[trackIndex]?.name}
      />
    </div>
  );
}

export default Landing;
