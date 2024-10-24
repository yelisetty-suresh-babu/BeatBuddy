// import React, { useState, useRef, useEffect } from "react";
// import play from "../../public/play.png";
// import pause from "../../public/pause.png";
// import forward from "../../public/forward-button.png";
// import backward from "../../public/previous.png";

// const AudioPlayer = ({ src, next, prev, isplay,name }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(isplay);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(NaN); // Initialize duration to NaN
//   const [isLooping, setIsLooping] = useState(false);
//   const [volume, setVolume] = useState(0.5);

//   const togglePlay = () => {
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleTimeUpdate = () => {
//     console.log("Current Time:", audioRef.current.currentTime);
//     setCurrentTime(audioRef.current.currentTime);
//     console.log("Duration:", audioRef.current.duration);
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     audioRef.current.currentTime = newTime; // Set the currentTime of the audio element
//     setCurrentTime(newTime); // Update currentTime state
//     if (!audioRef.current.paused) {
//       // If audio is playing, pause it during seek
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     audioRef.current.volume = newVolume;
//   };

//   const handleNext = () => {
//     // Implement logic for playing the next track
//   };

//   const handlePrevious = () => {
//     // Implement logic for playing the previous track
//   };

//   const handleLoopToggle = () => {
//     setIsLooping(!isLooping);
//     audioRef.current.loop = !audioRef.current.loop;
//   };

//   const handleLoadedMetadata = () => {
//     // Update duration when metadata is loaded
//     setDuration(audioRef.current.duration);
//   };

//   return (
//     <div className="bottom-0 fixed z-[1] w-full  pt-2 bg-slate-400 rounded-lg">
//       <h1 className=" block ">{name.slice(0,-4)}</h1>
//       <audio
//         autoPlay={isplay}
//         onPlaying={() => setIsPlaying(true)}
//         ref={audioRef}
//         src={src}
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata} // Add this event handler
//         onEnded={handleNext}
//       />
//       <div className="flex flex-col  ">
//         <div className="flex justify-center mb-2 mt-4">
//           <input
//             type="range"
//             min={0}
//             max={isNaN(duration) ? 0 : duration}
//             value={currentTime}
//             onChange={handleSeek}
//             className="w-[80%]"
//           />
//         </div>
//         <div className="flex justify-around ">
//           <h1>
//             {Math.round(parseFloat(currentTime / 60))}.
//             {Math.round(currentTime % 60)}
//           </h1>
//           <h1></h1>
//           <h1></h1>
//           <h1></h1>

//           <h1>
//             {Math.round(duration / 60)}.{Math.round(duration % 60)}
//           </h1>
//         </div>
//         <div className="flex justify-around ">
//           <button
//             onClick={() => {
//               // audioRef.current.pause();
//               setIsPlaying(false);
//               prev();
//             }}
//           >
//             <img src={backward} className=" " alt="" />
//           </button>
//           <button onClick={togglePlay}>
//             {isPlaying ? (
//               <img src={pause} className=" " alt="" />
//             ) : (
//               <img src={play} className=" " alt="" />
//             )}
//           </button>
//           {/* <button onClick={next}>Next</button> */}
//           <button
//             onClick={() => {
//               // audioRef.current.pause();
//               setIsPlaying(false);
//               next();
//             }}
//           >
//             <img src={forward} className=" " alt="" />
//           </button>
//         </div>

//         <div className="flex justify-between w-[80%] self-center ">
//           <button>loop</button>
//           <input
//             type="range"
//             min={0}
//             max={1}
//             step={0.01}
//             value={volume}
//             onChange={handleVolumeChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioPlayer;

import React, { useState, useRef, useEffect } from "react";
import play from "../../public/play.png";
import pause from "../../public/pause.png";
import forward from "../../public/forward-button.png";
import backward from "../../public/previous.png";

const AudioPlayer = ({ src, next, prev, isplay, name }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isplay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(NaN); 
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    console.log("Current Time:", audioRef.current.currentTime);
    setCurrentTime(audioRef.current.currentTime);
    console.log("Duration:", audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime; 
    setCurrentTime(newTime); 
    if (!audioRef.current.paused) {

      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleNext = () => {

  };

  const handlePrevious = () => {

  };

  const handleLoopToggle = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !audioRef.current.loop;
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="bottom-0 fixed z-[1] w-full pb-2 bg-slate-400 rounded-md ">
      <audio
        autoPlay={isplay}
        onPlaying={() => setIsPlaying(true)}
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata} // Add this event handler
        onEnded={handleNext}
      />
      <div className="flex flex-col  ">
        <h1 className="self-center pt-2 font-semibold text-[#fff18a]" >{name}</h1>
        <div className="flex justify-center mb-2 mt-4">
          <input
            type="range"
            min={0}
            max={isNaN(duration) ? 0 : duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-[80%]"
          />
        </div>
        <div className="flex justify-around ">
          <h1>
            {Math.round(parseFloat(currentTime / 60))}.
            {Math.round(currentTime % 60)}
          </h1>
          <h1></h1>
          <h1></h1>
          <h1></h1>

          <h1>
            {Math.round(duration / 60)}.{Math.round(duration % 60)}
          </h1>
        </div>
        <div className="flex justify-around ">
          <button
            onClick={() => {
              // audioRef.current.pause();
              setIsPlaying(false);
              prev();
            }}
          >
            <img src={backward} className=" " alt="" />
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <img src={pause} className=" " alt="" />
            ) : (
              <img src={play} className=" " alt="" />
            )}
          </button>

          <button
            onClick={() => {
              // audioRef.current.pause();
              setIsPlaying(false);
              next();
            }}
          >
            <img src={forward} className=" " alt="" />
          </button>
        </div>

        <div className="flex justify-between w-[80%] self-center ">
          <button>loop</button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
