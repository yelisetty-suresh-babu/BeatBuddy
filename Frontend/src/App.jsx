// // App.js
// import React from "react";
// import AudioRecorder from "./components/AudioRecorder";
// import SongDownloader from "./components/SongDownloader";
// import DownloadPage from "./components/DownloadPage";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   Link,
//   Routes,
// } from "react-router-dom";
// import Layout from "./components/Layout";
// import MusicPlayer from "./components/MusicPlayer";

// const router_ = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes path="/" element={Layout}>
//       <Route index element={MusicPlayer} />
//       <Route path="/download" element={AudioRecorder} />
//       <Route path="/recognize" element={AudioRecorder} />
//     </Routes>
//   )
// );
// function App() {
//   return <RouterProvider router={router_} />;
// }
// // <div className="App bg-gray-50">
// //   <SongDownloader />
// //   {/* <AudioRecorder /> */}
// //   {/* <First /> */}
// //   {/* <ShazamBtn /> */}
// //   {/* <Download_Page /> */}
// // </div>

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioRecorder from "./components/AudioRecorder";
import SongDownloader from "./components/SongDownloader";
import DownloadPage from "./components/DownloadPage";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import Login_Signup from "./components/Login_Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/download" element={<SongDownloader />} />
          <Route path="/:name" element={<DownloadPage />} />
          <Route path="/recognize" element={<AudioRecorder />} />
          <Route path="/login" element={<Login_Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
