// App.js
import React from "react";
import AudioRecorder from "./components/AudioRecorder";
import SongDownloader from "./components/SongDownloader";

function App() {
  return (
    <div className="App bg-gray-50">
      {/* <SongDownloader /> */}

      <AudioRecorder />
      {/* <First /> */}
      {/* <ShazamBtn /> */}
    </div>
  );
}

export default App;
