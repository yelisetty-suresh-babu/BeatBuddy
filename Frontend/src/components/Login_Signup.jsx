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
    <div className="flex items-center justify-center mt-10 fade-up-element ">
      <div className=" bg-skin-fill-signup shadow-2xl h-[500px] w-[50%] rounded-xl flex flex-col items-center ">
        {/* <div className="w-[1px] h-[300px] bg-gray-400 rounded-xl "></div> */}
        <div className="flex  justify-evenly  w-2/5 items-center my-10">
          <button
            onClick={() => setSigned("signup")}
            className=" bg-skin-fill text-white px-3 py-1 rounded-lg hover:bg-skin-button-accent-hover"
          >
            Signup
          </button>
          <button
            onClick={() => setSigned("login")}
            className=" bg-skin-fill text-white px-3 py-1 rounded-lg hover:bg-skin-button-accent-hover"
          >
            Login
          </button>
        </div>
        {signed === "signup" ? <SignUp_sample /> : <Login_sample />}
      </div>
    </div>
  );
}

export default Login_Signup;
