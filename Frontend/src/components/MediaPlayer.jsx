// import React, { useEffect, useState } from "react";

// function MediaPlayer({ audioFile }) {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [audioName, setAudioName] = useState("");

//   const togglePlay = () => {
//     setIsPlaying((isPlaying) => !isPlaying);
//   };
//   console.log(audioFile.name);

//   useEffect(() => {
//     console.log(isPlaying)
//   }, [isPlaying]);

//   return (
//     <div>
//       <audio controls autoPlay={isPlaying} onEnded={() => setIsPlaying(false)}>
//         <source
//           //   src={`http://localhost:3000/songs/Adhento_Gaani_Vunnapaatuga_-_SenSongsMp3.Co.mp3`}
//           src={`http://localhost:3000/songs/${audioFile.name}`}
//           type="audio/mp3"
//         />
//         Your browser does not support the audio element.
//       </audio>
//       <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
//     </div>
//   );
// }

// export default MediaPlayer;

import React, { useEffect, useState } from "react";

function MediaPlayer({ audioFile }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioName, setAudioName] = useState("");

  const togglePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  useEffect(() => {
    // console.log(isPlaying);
    // Play or pause the audio based on the isPlaying state
    const audio = document.getElementById("audio-player");
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div>
      <audio id="audio-player" controls onEnded={() => setIsPlaying(false)}>
        <source
          src={`http://localhost:3000/songs/${audioFile.name}`}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}

export default MediaPlayer;
