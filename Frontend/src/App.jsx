// App.js
import React from "react";
import AudioRecorder from "./components/AudioRecorder";
import SongDownloader from "./components/SongDownloader";
import Download_Page from "./components/Download_Page";

function App() {
  return (
    <div className="App bg-gray-50">
      <SongDownloader />
      {/* <AudioRecorder /> */}
      {/* <First /> */}
      {/* <ShazamBtn /> */}
      {/* <Download_Page /> */}
    </div>
  );
}

export default App;
