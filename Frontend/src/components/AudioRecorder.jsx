// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import AnimeBtn from "./AnimeBtn.jsx";
// import fs from "fs";

// import Readable from "stream";
// import { Navigate, useNavigate } from "react-router";

// function AudioRecorder() {
//   const [recording, setRecording] = useState(false);
//   const [clicked, setClicked] = useState(false);
//   const [show, setShow] = useState(false);
//   const [_data, setData] = useState({
//     img: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/69/13/a3/6913a33a-0721-4f7b-b381-3eb42617c8c1/886446348209.jpg/400x400cc.jpg",
//     name: "hamsaro",
//   });
//   const [scrollToEnd, setScrollToEnd] = useState(false);
//   const [songData, setSongdata] = useState({});
//   const contentRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setShow(false);
//     // if (!localStorage.getItem("accessToken")) {
//     //   Navigate("/login");
//     // }
//   }, []);

//   useEffect(() => {
//     if (scrollToEnd) {
//       // Scroll to the end of the page
//       window.scrollTo(0, document.body.scrollHeight);

//       // Reset the state to prevent infinite scrolling
//       setScrollToEnd(false);
//     }
//   }, [scrollToEnd]);

//   // const handleRecord = async () => {
//   //   setRecording(true);
//   //   try {
//   //     const mediaStream = await navigator.mediaDevices.getUserMedia({
//   //       audio: true,
//   //     });
//   //     const mediaRecorder = new MediaRecorder(mediaStream);
//   //     const chunks = [];

//   //     mediaRecorder.ondataavailable = (e) => {
//   //       chunks.push(e.data);
//   //     };

//   //     mediaRecorder.onstop = async () => {
//   //       const blob = new Blob(chunks, { type: "audio/mp3" });
//   //       setScrollToEnd(true);
//   //       setShow(true);
//   //       uploadToShazam(blob);
//   //       setRecording(false);
//   //     };

//   //     mediaRecorder.start();
//   //     setTimeout(() => {
//   //       mediaRecorder.stop();
//   //     }, 5000);
//   //   } catch (error) {
//   //     console.error("Error accessing microphone:", error);
//   //   }
//   // };

//   // const uploadToShazam = async (audioData) => {
//   //   try {
//   //     const blob = new Blob([audioData], { type: "audio/mp3" });

//   //     // Convert Blob to a data URL
//   //     const dataURL = URL.createObjectURL(blob);

//   //     // Convert data URL to a Blob
//   //     const dataBlob = await fetch(dataURL).then((res) => res.blob());

//   //     // Convert Blob to a ReadableStream
//   //     const stream = stream.Readable.from([dataBlob]);

//   //     const formData = new FormData();

//   //     // Append the ReadableStream to the FormData object
//   //     formData.append("audio", stream, "recorded_audio.mp3");

//   //     const options = {
//   //       method: "POST",
//   //       url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
//   //       headers: {
//   //         "X-RapidAPI-Key":
//   //           "ad65a452famsh0af741fddd6c32ep192841jsnb496421e93bd",
//   //         "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
//   //         "Content-Type": "multipart/form-data",
//   //         ...formData.getHeaders(),
//   //       },
//   //       data: formData,
//   //     };

//   //     // Make the API call
//   //     console.log("made the API call");
//   //     const response = await axios.request(options);
//   //     console.log(response.data);
//   //     console.log(response.data.track.title);

//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error uploading to Shazam:", error);
//   //     throw error;
//   //   }
//   // };

//   // const uploadToShazam = async (audioData) => {
//   //   try {

//   //     const fileName = `recorded_audio_${Date.now()}.mp3`;

//   //     const filePath = "./audio_files/" + fileName;

//   //     await fs.promises.writeFile(filePath, audioData, "binary");

//   //     const formData = new FormData();
//   //     formData.append("audio", fs.createReadStream(filePath), fileName);

//   //     const options = {
//   //       method: "POST",
//   //       url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
//   //       headers: {
//   //         "X-RapidAPI-Key":
//   //           "ad65a452famsh0af741fddd6c32ep192841jsnb496421e93bd",
//   //         "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
//   //         ...formData.getHeaders(),
//   //       },
//   //       data: formData,
//   //     };

//   //     console.log("made the API call");
//   //     const response = await axios.request(options);
//   //     console.log(response.data);
//   //     console.log(response.data.track.title);

//   //     await fs.promises.unlink(filePath);

//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error uploading to Shazam:", error);
//   //     throw error;
//   //   }
//   // };

//   // const uploadToShazam = async (audioBlob) => {
//   //   const formData = new FormData();
//   //   formData.append("audio", audioBlob, "recorded_audio.mp3");

//   //   const options = {
//   //     method: "POST",
//   //     url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
//   //     headers: {
//   //       "X-RapidAPI-Key": "ad65a452famsh0af741fddd6c32ep192841jsnb496421e93bd",
//   //       "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
//   //       ...formData.getHeaders(),
//   //     },
//   //     data: formData,
//   //   };

//   //   try {
//   //     console.log("made the api call");
//   //     const response = await axios.request(options);
//   //     console.log(response.data);
//   //     console.log(response.data.track.title);
//   //     setData({
//   //       img: response.data.images.coverart,
//   //       name: response.data.track.title,
//   //     });
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const handleRecordAndUpload = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });

//       const mediaRecorder = new MediaRecorder(mediaStream);
//       const chunks = [];

//       mediaRecorder.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(chunks, { type: "audio/mp3" });
//         const formData = new FormData();
//         formData.append("upload_file", blob, "temp.mp3");

//         const options = {
//           method: "POST",
//           url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
//           headers: {
//             "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,
//             "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
//             "Content-Type": "multipart/form-data",
//           },
//           data: formData,
//         };

//         try {
//           const response = await axios.request(options);
//           console.log(response.data);
//           setSongdata(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       mediaRecorder.start();
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 5000);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col  items-center justify-around p-10"
//       // onClick={handleRecord}
//       onClick={handleRecordAndUpload}
//       disabled={recording}
//     >
//       <div>
//         <h1 className="text-[50px] ">Song Recognizer</h1>
//         <AnimeBtn className="" />
//       </div>

//       {songData.track?.images?.coverart ? (
//         <div
//           className=" mt-5 flex items-end justify-center
//          h-[900px] w-[800px] bg-center bg-no-repeat bg-cover rounded-xl  shadow-lg animate-fade "
//           style={{
//             backgroundImage: `url('${songData?.track?.images?.coverart}')`,
//           }}
//         >
//           <div className="bg-gradient-to-b from-transparent to-gray-300 w-full flex items-end justify-center h-[40%] rounded-xl">
//             <h1 className="text-black font-serif text-3xl shadow-2xl mb-5 text-[40px] ">
//               {songData?.track?.title.toUpperCase()}
//             </h1>
//           </div>
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// }

// export default AudioRecorder;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AnimeBtn from "./AnimeBtn.jsx";
import fs from "fs";

import Readable from "stream";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [_data, setData] = useState({
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/69/13/a3/6913a33a-0721-4f7b-b381-3eb42617c8c1/886446348209.jpg/400x400cc.jpg",
    name: "hamsaro",
  });
  const [scrollToEnd, setScrollToEnd] = useState(false);
  const [songData, setSongdata] = useState({});
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    if (scrollToEnd) {
      // Scroll to the end of the page
      window.scrollTo(0, document.body.scrollHeight);

      // Reset the state to prevent infinite scrolling
      setScrollToEnd(false);
    }
  }, [scrollToEnd]);

  const handleRecordAndUpload = async () => {
    setError();
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(mediaStream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        const formData = new FormData();
        formData.append("upload_file", blob, "temp.mp3");

        const options = {
          method: "POST",
          url: "https://shazam-api6.p.rapidapi.com/shazam/recognize/",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,
            "X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);
          setSongdata(response.data);
          setError(response.data.message);
        } catch (error) {
          console.error(error);
        }
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  return (
    <div
      className="pt-20 flex flex-col  items-center justify-around p-10"
      // onClick={handleRecord}
      onClick={handleRecordAndUpload}
      disabled={recording}
    >
      <div>
        <h1 className=" text-6xl font-medium text-skin-main my-5">
          Song Recognizer
        </h1>
        <h1 className=" text-skin-base-2 text-[#fff18a] ">
          Please grant permission to use the microphone and play the song
        </h1>
        <AnimeBtn className="" />
      </div>
      {error && (
        <div className="animate-fade">
          <h1 className="text-2xl font-bold text-[#fff18a]">
            Song Could not be found try again
          </h1>
        </div>
      )}
      {!songData.track?.images?.coverart ? (
        <></>
      ) : (
        <div className="w-full flex items-center justify-center gap-x-10 pt-10">
          <div>
            <img
              src={songData?.track.images.coverart}
              alt=""
              className="h-[30rem] rounded-xl"
            />
          </div>
          <div className="bg-slate-400 w-[30rem] h-[15rem] p-5 rounded-xl flex flex-col items-center justify-center text-[#fff18a]">
            <h1 className="text-3xl font-bold overflow-scroll">
              {songData?.track?.title.toUpperCase()}
            </h1>
            <h1 className="text-2xl overflow-x-scroll self-center">
              {songData?.track.sections[0].metadata[0].text}
            </h1>
            <h1 className="text-2xl ">{songData?.track.subtitle}</h1>
            <Link
              className="pt-4 overflow-x-scroll"
              to={`/${songData?.track?.title.toUpperCase()}`}
              state={{
                image: songData?.track.images.coverart,
                artist: songData?.track.sections[0].metadata[0].text,
                album: songData?.track.subtitle,
              }}
              key={Math.ceil(Math.random() * 10)}
            >
              <button
                type="button"
                className="bg-[#eab308] text-white px-2 rounded-md py-1"
              >
                Download
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;

// <h1 className="text-white text-4xl font-bold">Song could not be determined , please try again</h1>

{
  /* <div className="flex ">
<div>
  <img src={songData.track.images.coverart} alt="" />
</div>
<div>
  <h1>{songData?.track?.title.toUpperCase()}</h1>
  <h1>{songData.track.subtitle}</h1>
  <h1>{songData.track.sections[0].metadata[0].text}</h1>
  <Link>Download</Link>
</div>
</div> */
}
