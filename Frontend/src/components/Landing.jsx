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

function Landing() {
  const [songs, setSongs] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isplay, setIsPlay] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
      })
      .catch((err) => console.error(err));
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
    <div>
      <h1>List of Songs</h1>


      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.name}
            <button
              onClick={() => {
                setTrackIndex(index);
                setIsPlay(true);
              }}
            >
              Play
            </button>
          </li>
        ))}
      </ul>
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