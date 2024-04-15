// import React, { useEffect, useState } from "react";
// import MediaPlayer from "./MediaPlayer";
// function Landing() {
//   const [audioName, setAudioName] = useState("");
//   const [songs, setSongs] = useState([]);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:3000/songs")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setSongs(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const playSong = (song) => {
//     if (currentSong === song && isPlaying) {
//       setIsPlaying(false);
//     } else {
//       setCurrentSong(song);
//       setAudioName(song);
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <div>
//       <h1>List of Songs</h1>
//       <ul>
//         {songs.map((song) => (
//           <li key={song.name} >
//             {song.name}
//             <button onClick={() => playSong(song)}>Play</button>
//           </li>
//         ))}
//       </ul>

//       <MediaPlayer audioFile={audioName} />
//     </div>
//   );
// }

// export default Landing;
import React, { useState, useEffect } from "react";
import MediaPlayer from "./MediaPlayer";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const playSong = (song) => {
    if (currentSong === song && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <h1>List of Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.name}>
            {song.name}
            <button onClick={() => playSong(song)}>Play</button>
          </li>
        ))}
      </ul>
      {currentSong && (
        <MediaPlayer key={currentSong.name} audioFile={currentSong} />
      )}
    </div>
  );
}

export default App;
