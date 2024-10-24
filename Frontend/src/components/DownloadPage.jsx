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
  console.log(str);
  try {
    const videoId = await call_yt(str);
    // console.log(videoId);
    return videoId;
  } catch (error) {
    console.error(`Error fetching videoId for '${str}':`, error);
  }
};

function DownloadPage() {
  const params = useParams();
  const navigate = useNavigate();
  // const { image, artist } = useLocation();
  const { image, artist, album } = useLocation().state;
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handle = async () => {
    // console.log(params.name);
    const id = await get_ids(params.name);
    // const id = "a7GITgqwDVg";
    console.log(id);
    setDownloading(true);
    try {
      const res = await axios.post("http://localhost:3000/convert", {
        videoID: id,
      });
      setDownloading(false);
      setDownloaded(true);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-inherit mt-10 ">
      <button className="self-start ml-10 text-white" onClick={goBack}>
        ←
      </button>
      <div
        className="w-96 h-56 bg-cover bg-center flex items-end justify-center rounded-xl "
        style={{
          backgroundImage:
            // "url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')",
            `url(${image})`,
        }}
      >
        <button
          // className="h-10 w-fit relative top-[27px] bg-green-500 p-2 rounded-lg text-white"
          className="h-10 w-fit relative top-[27px] bg-[#fff18a] p-2 rounded-lg text-black font-bold"
          onClick={handle}
        >
          Download
        </button>
      </div>
      <div className="mt-10 flex flex-col items-center font-extrabold font-serif text-white">
        <h1>Song Name : {params.name}</h1>
        <h1>Artist : {artist}</h1>
        <h1>Album : {album}</h1>
      </div>
      {downloading && (
        <div className="mt-5 text-3xl font-bold text-white animate-fade">
          Song is Downloading
        </div>
      )}
      {downloaded && (
        <div className="mt-5 text-3xl font-bold text-white animate-fade">
          Song is Downloaded
        </div>
      )}
    </div>
  );
}

export default DownloadPage;
