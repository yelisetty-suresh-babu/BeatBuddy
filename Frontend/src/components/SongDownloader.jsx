// import axios from "axios";

// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import { Link, Navigate, useNavigate } from "react-router-dom";

// function SongDownloader() {
//   // useEffect(() => {
//   //   console.log(import.meta.env.VITE_rapid_api_key);
//   // }, []);
//   const [link, setLink] = useState("");
//   const [names, setNames] = useState();
//   const [url, setUrl] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("accessToken")) {
//         navigate('/login');
//     }
//     const storedLink = localStorage.getItem("savedLink");
//     if (storedLink) {
//       setLink(storedLink);
//     }
//     const cachedData = localStorage.getItem("cachedData");
//     if (cachedData) {
//       // If data is cached, set it in the state directly
//       setNames(JSON.parse(cachedData));
//       return; // Exit the function to avoid making the API call
//     }
//   }, []);

//   function extractPlaylistID(url) {
//     const regex = /playlist\/([a-zA-Z0-9]+)/;
//     const match = url.match(regex);
//     if (match && match.length >= 2) {
//       return match[1];
//     } else {
//       return null;
//     }
//   }

//   const call_yt = async (str) => {
//     const val =
//       await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpmN3VDO_RL-xMNRnzaK2R_EtVMh4Vuis
//     &q=${str}&part=snippet&type=video`);
//     const data = val.data; // No need for .json() as axios already parses JSON
//     return data.items[0].id.videoId;
//   };

//   const get_ids = async (items) => {
//     console.log(items);
//     const listOfVideoIds = [];
//     for (const str of items) {
//       try {
//         console.log(str);
//         const videoId = await call_yt(str);
//         console.log(videoId);
//         listOfVideoIds.push(videoId);
//       } catch (error) {
//         console.error(`Error fetching videoId for '${str}':`, error);
//       }
//     }
//     console.log("List of video IDs:", listOfVideoIds);
//   };

//   const handle = async (e) => {
//     e.preventDefault();
//     // Check if the data is already cached
//     const cachedData = localStorage.getItem("cachedData");
//     if (cachedData) {
//       // If data is cached, set it in the state directly
//       setNames(JSON.parse(cachedData));
//       return; // Exit the function to avoid making the API call
//     }

//     localStorage.setItem("savedLink", link);
//     const id_ = extractPlaylistID(link);
//     const options = {
//       method: "GET",
//       url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
//       params: {
//         id: id_,
//         offset: "0",
//         limit: "100",
//       },
//       headers: {
//         "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,

//         "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
//       },
//     };

//     try {
//       console.log("made the api call");
//       const res = await axios.request(options);

//       const processedData = res.data.items.map((data) => ({
//         name: data.track.name,
//         artist: data.track.album.artists[0].name,
//         image1: data.track.album.images[1].url,
//         image2: data.track.album.images[2].url,
//         album: data.track.album.name,
//       }));

//       // Cache the result
//       localStorage.setItem("cachedData", JSON.stringify(processedData));
//       // Set the data in the state
//       setNames(processedData);

//       console.log(res);
//       console.log(names);
//     } catch (error) {
//       console.log(error);
//     }
//     console.log("handled");
//   };

//   // const handle = async (e) => {
//   //   e.preventDefault();
//   //   localStorage.setItem("savedLink", link);
//   //   const id_ = extractPlaylistID(link);
//   //   const options = {
//   //     method: "GET",
//   //     url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
//   //     params: {
//   //       id: id_,
//   //       offset: "0",
//   //       limit: "100",
//   //     },
//   //     headers: {
//   //       "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,

//   //       "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
//   //     },
//   //   };

//   //   try {
//   //     console.log("made the api call");
//   //     const res = await axios.request(options);

//   //     setNames(
//   //       res.data.items.map((data) => {
//   //         return {
//   //           name: data.track.name,
//   //           artist: data.track.album.artists[0].name,
//   //           image1: data.track.album.images[1].url,
//   //           image2: data.track.album.images[2].url,
//   //           album: data.track.album.name,
//   //         };
//   //       })
//   //     );

//   //     // );
//   //     // return get_ids(
//   //     //   res.data.items.map((data) => {
//   //     //     return data.track.name + " " + data.track.album.artists[0].name;
//   //     //   })
//   //     // );
//   //     console.log(res);
//   //     console.log(names);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   //   console.log("handled");
//   // };

//   return (
//     <>
//       <div className="flex flex-col items-center bg-white mt-5">
//         <form
//           onSubmit={handle}
//           className="flex items-center gap-y-2 flex-col bg-white"
//         >
//           <input
//             type="text"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             className="border-black border-[1px] rounded-md px-2 py-1"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white p-1 px-4 rounded-lg"
//           >
//             click{" "}
//           </button>
//         </form>
//       </div>

//       {names ? (
//         <div className="mt-10 bg-white ">
//           {names.map((data, index) => (
//             <Link
//               to={`/${data.name}`}
//               state={{
//                 image: data.image1,
//                 artist: data.artist,
//                 album: data.album,
//               }}
//               key={index}
//               className=""
//             >
//               <div>
//                 <Cards
//                   key={index}
//                   name={data.name}
//                   image2={data.image2}
//                   artist={data.artist}
//                 />
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }

// export default SongDownloader;

// // {
// //   "added_at": "2022-12-09T15:46:23Z",
// //   "added_by": {
// //       "external_urls": {
// //           "spotify": "https://open.spotify.com/user/31ro2oibcuc7gzeyxviptxhnw54a"
// //       },
// //       "id": "31ro2oibcuc7gzeyxviptxhnw54a",
// //       "type": "user",
// //       "uri": "spotify:user:31ro2oibcuc7gzeyxviptxhnw54a"
// //   },
// //   "is_local": false,
// //   "primary_color": null,
// //   "track": {
// //       "album": {
// //           "album_type": "album",
// //           "artists": [
// //               {
// //                   "external_urls": {
// //                       "spotify": "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we"
// //                   },
// //                   "id": "6M2wZ9GZgrQXHCFfjv46we",
// //                   "name": "Dua Lipa",
// //                   "type": "artist",
// //                   "uri": "spotify:artist:6M2wZ9GZgrQXHCFfjv46we"
// //               }
// //           ],
// //           "external_urls": {
// //               "spotify": "https://open.spotify.com/album/7fJJK56U9fHixgO0HQkhtI"
// //           },
// //           "id": "7fJJK56U9fHixgO0HQkhtI",
// //           "images": [
// //               {
// //                   "height": 640,
// //                   "url": "https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f",
// //                   "width": 640
// //               },
// //               {
// //                   "height": 300,
// //                   "url": "https://i.scdn.co/image/ab67616d00001e024bc66095f8a70bc4e6593f4f",
// //                   "width": 300
// //               },
// //               {
// //                   "height": 64,
// //                   "url": "https://i.scdn.co/image/ab67616d000048514bc66095f8a70bc4e6593f4f",
// //                   "width": 64
// //               }
// //           ],
// //           "is_playable": true,
// //           "name": "Future Nostalgia",
// //           "release_date": "2020-03-27",
// //           "release_date_precision": "day",
// //           "total_tracks": 11,
// //           "type": "album",
// //           "uri": "spotify:album:7fJJK56U9fHixgO0HQkhtI"
// //       },
// //       "artists": [
// //           {
// //               "external_urls": {
// //                   "spotify": "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we"
// //               },
// //               "id": "6M2wZ9GZgrQXHCFfjv46we",
// //               "name": "Dua Lipa",
// //               "type": "artist",
// //               "uri": "spotify:artist:6M2wZ9GZgrQXHCFfjv46we"
// //           }
// //       ],
// //       "disc_number": 1,
// //       "duration_ms": 203807,
// //       "episode": false,
// //       "explicit": false,
// //       "external_ids": {
// //           "isrc": "GBAHT1901299"
// //       },
// //       "external_urls": {
// //           "spotify": "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP"
// //       },
// //       "id": "39LLxExYz6ewLAcYrzQQyP",
// //       "is_local": false,
// //       "is_playable": true,
// //       "name": "Levitating",
// //       "popularity": 78,
// //       "preview_url": "https://p.scdn.co/mp3-preview/ac28d1b0be285ed3bfd8e9fa5fad133776d7cf36?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
// //       "track": true,
// //       "track_number": 5,
// //       "type": "track",
// //       "uri": "spotify:track:39LLxExYz6ewLAcYrzQQyP"
// //   },
// //   "video_thumbnail": {
// //       "url": null
// //   }
// // }

import axios from "axios";

import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link, Navigate, useNavigate } from "react-router-dom";

function SongDownloader() {
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_rapid_api_key);
  // }, []);
  const [link, setLink] = useState("");
  const [names, setNames] = useState();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    const storedLink = localStorage.getItem("savedLink");
    if (storedLink) {
      setLink(storedLink);
    }
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      // If data is cached, set it in the state directly
      setNames(JSON.parse(cachedData));
      return; // Exit the function to avoid making the API call
    }
  }, []);

  function extractPlaylistID(url) {
    const regex = /playlist\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    if (match && match.length >= 2) {
      return match[1];
    } else {
      return null;
    }
  }

  const call_yt = async (str) => {
    const val =
      await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpmN3VDO_RL-xMNRnzaK2R_EtVMh4Vuis
    &q=${str}&part=snippet&type=video`);
    const data = val.data; // No need for .json() as axios already parses JSON
    return data.items[0].id.videoId;
  };

  const get_ids = async (items) => {
    console.log(items);
    const listOfVideoIds = [];
    for (const str of items) {
      try {
        console.log(str);
        const videoId = await call_yt(str);
        console.log(videoId);
        listOfVideoIds.push(videoId);
      } catch (error) {
        console.error(`Error fetching videoId for '${str}':`, error);
      }
    }
    console.log("List of video IDs:", listOfVideoIds);
  };

  const handle = async (e) => {
    e.preventDefault();
    // Check if the data is already cached
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      // If data is cached, set it in the state directly
      setNames(JSON.parse(cachedData));
      return; // Exit the function to avoid making the API call
    }

    localStorage.setItem("savedLink", link);
    const id_ = extractPlaylistID(link);
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
      params: {
        id: id_,
        offset: "0",
        limit: "100",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_rapid_api_key,

        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      console.log("made the api call");
      const res = await axios.request(options);

      const processedData = res.data.items.map((data) => ({
        name: data.track.name,
        artist: data.track.album.artists[0].name,
        image1: data.track.album.images[1].url,
        image2: data.track.album.images[2].url,
        album: data.track.album.name,
      }));

      // Cache the result
      localStorage.setItem("cachedData", JSON.stringify(processedData));
      // Set the data in the state
      setNames(processedData);

      console.log(res);
      console.log(names);
    } catch (error) {
      console.log(error);
    }
    console.log("handled");
  };

  return (
    <div className="">
      <div className="flex flex-col items-center pt-20 ">
        <h1 className=" text-skin-base-2 text-[#fff18a] pb-2">
          Please paste the link of the playlist to fetch songs
        </h1>
        <form onSubmit={handle} className="items-center w-1/2 mx-auto">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className=" bg-skin-fill-2 w-5/6 rounded-l-md py-1 px-3 outline-none "
          />
          <button
            type="submit"
            className="font-semibold text-skin-base w-1/6 bg-skin-button-accent hover:bg-skin-button-accent-hover h-8 p-1 px-4 rounded-r-lg"
          >
            Fetch{" "}
          </button>
        </form>
      </div>

      {names ? (
        <div className=" mt-10 bg-inherit ">
          {names.map((data, index) => (
            <Link
              to={`/${data.name}`}
              state={{
                image: data.image1,
                artist: data.artist,
                album: data.album,
              }}
              key={index}
              className=""
            >
              <div>
                <Cards
                  key={index}
                  name={data.name}
                  image2={data.image2}
                  artist={data.artist}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SongDownloader;
