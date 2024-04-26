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
    <div className="flex justify-between  mt-5">
      <h1 className="self-start ml-10 ">
        <Link
          className={`${
            loc.pathname === "/" ? "text-xl font-extrabold" : "font-extralight"
          } `}
          to="/"
        >
          BeatBuddy
        </Link>{" "}
        /{" "}
        <Link
          to="/download"
          className={`${
            loc.pathname === "/download" ? " text-xl font-extrabold " : "font-extralight"
          } `}
        >
          Download
        </Link>{" "}
        /{" "}
        <Link
          className={`${
            loc.pathname === "/recognize" ? "text-xl font-extrabold" : "font-extralight"
          } `}
          to="/recognize"
        >
          Recognize
        </Link>
      </h1>
      {val && (
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg mr-10 hover:bg-blue-700 "
        >
          logout
        </button>
      )}
    </div>
  );
}

export default Header;
