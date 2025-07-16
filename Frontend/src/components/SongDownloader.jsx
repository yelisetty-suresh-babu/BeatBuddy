
import axios from "axios";

import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link, Navigate, useNavigate } from "react-router-dom";

function SongDownloader() {
  const [link, setLink] = useState("");
  const [names, setNames] = useState();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    const storedLink = localStorage.getItem("savedLink");
    if (storedLink) {
      setLink(storedLink);
    }
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      setNames(JSON.parse(cachedData));
      return;
    }
  }, []);

  function extractPlaylistID(url) {
    const regex = /playlist\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    if (match && match.length >= 2) {
      return match[1];
    } else {
      return null;
    }
  }

  const call_yt = async (str) => {
    const val =
      await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpmN3VDO_RL-xMNRnzaK2R_EtVMh4Vuis
    &q=${str}&part=snippet&type=video`);
    const data = val.data;
    return data.items[0].id.videoId;
  };

  const get_ids = async (items) => {
    const listOfVideoIds = [];
    for (const str of items) {
      try {
        const videoId = await call_yt(str);
        listOfVideoIds.push(videoId);
      } catch (error) {
        console.error(`Error fetching videoId for '${str}':`, error);
      }
    }
    return listOfVideoIds;
  };

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Check if the data is already cached
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      setNames(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    localStorage.setItem("savedLink", link);
    const id_ = extractPlaylistID(link);
    if (!id_) {
      setError("Invalid playlist link. Please check and try again.");
      setLoading(false);
      return;
    }
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
      params: {
        id: id_,
        offset: "0",
        limit: "100",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.request(options);
      const processedData = res.data.items.map((data) => ({
        name: data.track.name,
        artist: data.track.album.artists[0].name,
        image1: data.track.album.images[1].url,
        image2: data.track.album.images[2].url,
        album: data.track.album.name,
      }));
      localStorage.setItem("cachedData", JSON.stringify(processedData));
      setNames(processedData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch playlist. Please check the link or try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center py-10 px-2">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-8 mt-8">
        <h1 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
          Download Songs from a Spotify Playlist
        </h1>
        <form onSubmit={handle} className="flex w-full max-w-xl mb-4 gap-2">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste Spotify playlist link here..."
            className="flex-1 bg-white/20 text-white placeholder:text-white/60 rounded-l-lg py-2 px-4 outline-none focus:ring-2 focus:ring-yellow-400/60 text-base"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="font-bold text-slate-900 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 px-6 py-2 rounded-r-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-400"></span>
                Loading
              </span>
            ) : (
              "Fetch"
            )}
          </button>
        </form>
        {error && (
          <div className="w-full text-center text-red-400 font-semibold mb-4 bg-red-900/30 rounded-lg py-2 px-3">
            {error}
          </div>
        )}
        <p className="text-white/80 text-sm mb-2">Paste a public Spotify playlist link to fetch and download songs.</p>
      </div>
      {loading && (
        <div className="flex flex-col items-center mt-10">
          <span className="animate-bounce text-3xl text-yellow-400 mb-2">● ● ●</span>
          <span className="text-white/80">Fetching playlist...</span>
        </div>
      )}
      {names && !loading && (
        <div className="mt-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {names.map((data, index) => (
            <Link
              to={`/${data.name}`}
              state={{
                image: data.image1,
                artist: data.artist,
                album: data.album,
              }}
              key={index}
              className="hover:scale-[1.03] transition-transform"
            >
              <div>
                <Cards
                  key={index}
                  name={data.name}
                  image2={data.image2}
                  artist={data.artist}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SongDownloader;
