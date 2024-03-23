import axios from "axios";

import React, { useEffect, useState } from "react";

function SongDownloader() {
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_rapid_api_key);
  // }, []);
  const [link, setLink] = useState("");
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
    const data = val.data; // No need for .json() as axios already parses JSON
    return data.items[0].id.videoId;
  };

  const get_ids = async (items) => {
    console.log(items);
    const listOfVideoIds = [];
    for (const str of items) {
      try {
        console.log(str);
        const videoId = await call_yt(str);
        console.log(videoId);
        listOfVideoIds.push(videoId);
      } catch (error) {
        console.error(`Error fetching videoId for '${str}':`, error);
      }
    }
    console.log("List of video IDs:", listOfVideoIds);
  };
  const handle = async (e) => {
    e.preventDefault();
    const id_ = extractPlaylistID(link);
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
      console.log("made the api call");
      const res = await axios.request(options);
      return get_ids(
        res.data.items.map((data) => {
          return data.track.name + " " + data.track.album.artists[0].name;
        })
      );
      // console.log(options);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-5">
        <form
          onSubmit={handle}
          className="flex items-center gap-y-2 flex-col bg-white"
        >
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border-black border-[1px] rounded-lg"
          />
          <button
            type="submit"
            className="bg-black text-white p-1 px-4 rounded-lg"
          >
            click{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default SongDownloader;
