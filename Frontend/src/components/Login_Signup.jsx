import React, { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Login_sample from "./Login_sample";
import SignUp_sample from "./SignUp_sample";

function Login_Signup() {
  const [signed, setSigned] = useState("signup");
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
    localStorage.removeItem("cachedData");
    localStorage.removeItem("savedLink");
  }, []);
  return (
    <div className="flex items-center justify-center mt-20 fade-up-element ">
      <div className="bg-white shadow-2xl h-[500px] w-[50%] rounded-xl flex flex-col items-center ">
        {/* <div className="w-[1px] h-[300px] bg-gray-400 rounded-xl "></div> */}
        <div className="flex  justify-evenly  w-[40%] items-center  pl-10 m-10">
          <button
            onClick={() => setSigned("signup")}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            Signup
          </button>
          <button
            onClick={() => setSigned("login")}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
        {signed === "signup" ? <SignUp /> : <Login_sample />}
      </div>
    </div>
  );
}

export default Login_Signup;
