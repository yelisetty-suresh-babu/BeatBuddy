// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { Link, useLocation } from "react-router-dom";

// function Header() {
//   const navigate = useNavigate();
//   const loc = useLocation();
//   const [val, setVal] = useState(true);
//   // console.log(loc.pathname);
//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     navigate("/login", { replace: true });
//   };
//   // useEffect(() => {
//   //   if (localStorage.getItem("accessToken")) {
//   //     setVal(true);
//   //   }
//   // }, []);
//   return (
//     <div className="flex justify-between  pt-5 text-white">
//       <h1 className="self-start ml-10 ">
//         <Link
//           className={`${
//             loc.pathname === "/" ? "text-xl font-extrabold" : "font-extralight"
//           } `}
//           to="/"
//         >
//           BeatBuddy
//         </Link>{" "}
//         /{" "}
//         <Link
//           to="/download"
//           className={`${
//             loc.pathname === "/download" ? " text-xl font-extrabold " : "font-extralight"
//           } `}
//         >
//           Download
//         </Link>{" "}
//         /{" "}
//         <Link
//           className={`${
//             loc.pathname === "/recognize" ? "text-xl font-extrabold" : "font-extralight"
//           } `}
//           to="/recognize"
//         >
//           Recognize
//         </Link>
//       </h1>
//       {val && (
//         <button
//           onClick={logout}
//           className="bg-blue-600 text-white px-3 py-1 rounded-lg mr-10 hover:bg-blue-700 "
//         >
//           logout
//         </button>
//       )}
//     </div>
//   );
// }

// export default Header;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [val, setVal] = useState(true);
  // console.log(loc.pathname);
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };
  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     setVal(true);
  //   }
  // }, []);
  return (
    <>
      <h1 className="font-semibold ml-10 text-5xl text-skin-heading-1 tracking-wider pt-2">
        <Link to="/">BeatBuddy</Link>
      </h1>
      <div className="flex justify-between text-skin-main ">
        {loc.pathname !== "/login" && (
          <h1 className="self-start mx-10">
            <Link
              className={`${
                loc.pathname === "/" ? "text-3xl font-bold" : "font-extralight"
              } `}
              to="/"
            >
              Player
            </Link>{" "}
            /{" "}
            <Link
              to="/download"
              className={`${
                loc.pathname === "/download"
                  ? " text-3xl font-bold "
                  : "font-extralight"
              } `}
            >
              Downloader
            </Link>{" "}
            /{" "}
            <Link
              className={`${
                loc.pathname === "/recognize"
                  ? "text-3xl font-bold"
                  : "font-extralight"
              } `}
              to="/recognize"
            >
              Recognizer
            </Link>
          </h1>
        )}
        {loc.pathname !== "/login" && (
          <button
            onClick={logout}
            className=" bg-[#eab308] text-skin-base px-3 py-1 rounded-lg mr-10 hover:bg-skin-button-accent text-white"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
