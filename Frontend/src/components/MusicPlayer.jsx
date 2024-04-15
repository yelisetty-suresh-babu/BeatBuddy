// import React, { useEffect } from "react";

// function MusicPlayer() {
//   useEffect(() => {
//     localStorage.removeItem("savedLink");
//     localStorage.removeItem("cachedData");
//   }, []);
//   return <div>MusicPlayer</div>;
// }

// export default MusicPlayer;

import React, { useState, useEffect } from "react";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/songs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        <div>
          <h2>Now Playing: {currentSong.name}</h2>
          <audio
            controls
            autoPlay={isPlaying}
            onEnded={() => setIsPlaying(false)}
          >
            <source
              src={`http://localhost:3000/songs/${currentSong.name}`}
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;
