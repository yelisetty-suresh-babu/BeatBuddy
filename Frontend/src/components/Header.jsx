import React from "react";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex justify-around ">
      <h1>header</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Header;
