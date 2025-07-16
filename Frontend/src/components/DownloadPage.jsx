import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

const call_yt = async (str) => {
  const val =
    await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpmN3VDO_RL-xMNRnzaK2R_EtVMh4Vuis
  &q=${str}&part=snippet&type=video`);
  const data = val.data; // No need for .json() as axios already parses JSON
  return data.items[0].id.videoId;
};

const get_ids = async (str) => {
  try {
    const videoId = await call_yt(str);
    return videoId;
  } catch (error) {
    console.error(`Error fetching videoId for '${str}':`, error);
    throw error;
  }
};

function DownloadPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { image, artist, album } = useLocation().state;
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    setError("");
    setDownloading(true);
    setDownloaded(false);
    try {
      const id = await get_ids(params.name);
      await axios.post("http://localhost:3000/convert", {
        videoID: id,
      });
      setDownloading(false);
      setDownloaded(true);
    } catch (error) {
      setDownloading(false);
      setDownloaded(false);
      setError("Failed to download song. Please try again later.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-10 px-2">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col items-center p-6 md:p-8 relative gap-4">
        <button className="absolute left-4 top-4 text-white text-xl md:text-2xl font-bold hover:text-yellow-400 transition" onClick={goBack}>
          ←
        </button>
        <div
          className="w-72 md:w-80 h-40 md:h-48 bg-cover bg-center flex items-end justify-center rounded-xl shadow-lg border-2 border-yellow-400/30 mb-4 md:mb-6"
          style={{ backgroundImage: `url(${image})` }}
        >
          <button
            className="h-10 md:h-12 w-48 md:w-48 mb-3 md:mb-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 font-bold rounded-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60 text-base md:text-lg"
            onClick={handle}
            disabled={downloading}
          >
            {downloading ? (
              <span className="flex items-center justify-center gap-2 w-full ">
                <span className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-t-2 border-b-2 border-yellow-400"></span>
                Downloading
              </span>
            ) : (
              "Download"
            )}
          </button>
        </div>
        <div className="mt-2 md:mt-4 flex flex-col items-center font-extrabold font-serif text-white w-full gap-1 md:gap-2">
          <h1 className="text-base md:text-lg mb-0.5 md:mb-1 truncate w-full text-center">Song Name: <span className="text-[#fff18a]">{params.name}</span></h1>
          <h1 className="text-sm md:text-base mb-0.5 md:mb-1 truncate w-full text-center">Artist: <span className="text-[#fff18a]">{artist}</span></h1>
          <h1 className="text-sm md:text-base mb-0.5 md:mb-1 truncate w-full text-center">Album: <span className="text-[#fff18a]">{album}</span></h1>
        </div>
        {downloading && (
          <div className="mt-4 md:mt-6 flex flex-col items-center animate-fade">
            <span className="animate-bounce text-2xl md:text-3xl text-yellow-400 mb-1 md:mb-2">● ● ●</span>
            <span className="text-white/80 text-sm md:text-base">Song is Downloading...</span>
          </div>
        )}
        {downloaded && !downloading && !error && (
          <div className="mt-4 md:mt-6 text-lg md:text-2xl font-bold text-green-400 bg-green-900/30 rounded-lg py-2 px-4 animate-fade">
            Song is Downloaded!
          </div>
        )}
        {error && (
          <div className="mt-4 md:mt-6 text-lg md:text-2xl font-bold text-red-400 bg-red-900/30 rounded-lg py-2 px-4 animate-fade">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadPage;
