import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AnimeBtn from "./AnimeBtn.jsx";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [songData, setSongdata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setSuccess(false);
    setError("");
  }, []);

  const handleRecordAndUpload = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);
    setSongdata({});
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream);
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        const formData = new FormData();
        formData.append("upload_file", blob, "temp.mp3");
        const options = {
          method: "POST",
          url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,
            "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };
        try {
          const response = await axios.request(options);
          setSongdata(response.data);
          if (response.data.track && response.data.track.title) {
            setSuccess(true);
          } else {
            setError("Song could not be found. Try again.");
          }
        } catch (error) {
          setError("Song could not be found. Try again.");
        }
        setLoading(false);
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    } catch (error) {
      setError("Error accessing microphone. Please allow microphone access.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-10 px-2">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col items-center p-10">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-wider">
          Song Recognizer
        </h1>
        <h2 className="text-lg text-white/80 mb-6 text-center">Tap below, grant microphone access, and play a song to recognize it!</h2>
        <button
          onClick={handleRecordAndUpload}
          disabled={loading}
          className="mb-6 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 font-bold text-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-400"></span>
              Listening...
            </span>
          ) : (
            "Tap to Recognize"
          )}
        </button>
        <AnimeBtn />
        {error && (
          <div className="w-full text-center text-red-400 font-semibold mb-4 bg-red-900/30 rounded-lg py-2 px-3 animate-fade">
            {error}
          </div>
        )}
        {success && songData.track?.images?.coverart && (
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 pt-10 animate-fade">
            <img
              src={songData.track.images.coverart}
              alt="coverart"
              className="h-60 w-60 object-cover rounded-xl shadow-lg border-2 border-yellow-400/30 mb-4 md:mb-0"
            />
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg w-full max-w-xs">
              <h1 className="text-2xl font-bold text-[#fff18a] mb-2 text-center">
                {songData.track.title.toUpperCase()}
              </h1>
              <h2 className="text-lg text-white/80 mb-1 text-center">
                {songData.track.sections?.[0]?.metadata?.[0]?.text}
              </h2>
              <h2 className="text-lg text-white/80 mb-4 text-center">
                {songData.track.subtitle}
              </h2>
              <Link
                className="w-full"
                to={`/${songData.track.title.toUpperCase()}`}
                state={{
                  image: songData.track.images.coverart,
                  artist: songData.track.sections?.[0]?.metadata?.[0]?.text,
                  album: songData.track.subtitle,
                }}
                key={Math.ceil(Math.random() * 10)}
              >
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 font-bold px-4 py-2 rounded-lg shadow hover:from-yellow-300 hover:to-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60 mt-2 "
                >
                  Download
                </button>
              </Link>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center mt-10 animate-fade">
            <span className="animate-bounce text-3xl text-yellow-400 mb-2">● ● ●</span>
            <span className="text-white/80">Listening for song...</span>
          </div>
        )}
        {success && !songData.track?.images?.coverart && (
          <div className="w-full text-center text-green-400 font-semibold mb-4 bg-green-900/30 rounded-lg py-2 px-3 animate-fade">
            Song recognized!
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioRecorder;
