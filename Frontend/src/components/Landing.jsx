// // import React, { useEffect, useState } from "react";
// // import MediaPlayer from "./MediaPlayer";
// // function Landing() {
// //   const [audioName, setAudioName] = useState("");
// //   const [songs, setSongs] = useState([]);
// //   const [currentSong, setCurrentSong] = useState(null);
// //   const [isPlaying, setIsPlaying] = useState(false);

// //   useEffect(() => {
// //     fetch("http://localhost:3000/songs")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         console.log(data);
// //         setSongs(data);
// //       })
// //       .catch((err) => console.error(err));
// //   }, []);

// //   const playSong = (song) => {
// //     if (currentSong === song && isPlaying) {
// //       setIsPlaying(false);
// //     } else {
// //       setCurrentSong(song);
// //       setAudioName(song);
// //       setIsPlaying(true);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>List of Songs</h1>
// //       <ul>
// //         {songs.map((song) => (
// //           <li key={song.name} >
// //             {song.name}
// //             <button onClick={() => playSong(song)}>Play</button>
// //           </li>
// //         ))}
// //       </ul>

// //       <MediaPlayer audioFile={audioName} />
// //     </div>
// //   );
// // }

// // export default Landing;

// import React, { useState, useEffect } from "react";
// import AudioPlayer from "./AudioPlayer";

// function App() {
//   const [songs, setSongs] = useState([]);
//   const [currentSong, setCurrentSong] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [trackIndex, setTrackIndex] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:3000/songs")
//       .then((res) => res.json())
//       .then((data) => {
//         setSongs(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);
//   useEffect(() => {
//     setCurrentSong(songs[trackIndex]?.name);
//   }, [trackIndex]);

//   const playSong = (song) => {
//     console.log(song.name);
//     console.log(`http://localhost:3000/songs/${song.name}`);
//     if (currentSong === song && isPlaying) {
//       setIsPlaying(false);
//     } else {
//       setCurrentSong(song);
//       setIsPlaying(true);
//     }
//   };

//   const handleClickPrevious = () => {
//     console.log("prev");
//     setTrackIndex((currentTrack) =>
//       currentTrack === 0 ? songs.length - 1 : currentTrack - 1
//     );
//   };

//   const handleClickNext = () => {
//     console.log("next");
//     setTrackIndex((currentTrack) =>
//       currentTrack < songs.length - 1 ? currentTrack + 1 : 0
//     );
//   };
//   return (
//     <div>
//       <h1>List of Songs</h1>
//       <ul>
//         {songs.map((song) => (
//           <li key={song.name}>
//             {song.name}
//             <button onClick={() => playSong(song)}>Play</button>
//           </li>
//         ))}
//       </ul>
//       {currentSong && (
//         <AudioPlayer src={`http://localhost:3000/songs/${currentSong.name}`} next={handleClickNext} prev={handleClickPrevious} />
//       )}
//     </div>
//   );
// }

// export default App;

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
          return; // Exit early if no token
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
    <div className="">
      <div className="p-4">
        <h1 className="font-semibold">List of Songs</h1>

        <ul className="flex flex-col items-center mx-5">
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex justify-between items-center w-full my-2 cursor-pointer"
              onClick={() => {
                setTrackIndex(index);
                setIsPlay(true);
              }}
            >
              <p className="self-start">{index + 1}</p>
              <p>{song.name.slice(0, -4)}</p>
              <button
                onClick={() => {
                  setTrackIndex(index);
                  setIsPlay(true);
                }}
                className="mx-2 bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer"
              >
                Play
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
      />
    </div>
  );
}

export default Landing;
