import React, { useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

function Login_Signup() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // window.location.reload()
  }, []);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("login");
    localStorage.removeItem("profiles");
    if (!hasReloaded) {
      // Reload the page only once
      localStorage.setItem("login", "true");
      window.location.reload();
    }
  }, []);
  return (
    <div className="flex items-center justify-center mt-20 fade-up-element ">
      <div className="bg-white shadow-2xl h-[500px] w-[80%] rounded-2xl flex items-center justify-around">
        <SignUp />
        <div className="w-[1px] h-[300px] bg-gray-400 rounded-xl "></div>
        <Login />
      </div>
    </div>
  );
}

export default Login_Signup;