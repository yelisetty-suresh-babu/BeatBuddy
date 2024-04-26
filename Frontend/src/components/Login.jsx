import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

function Login() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email_, setEmail] = useState("");
  const [password_, setPassword] = useState("");


  const login = async () => {
    try {
      console.log(email_, password_);
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email_,
        password: password_,
      });

      const accessToken = response.data.accesstoken;

      // Store the access token in local storage
      localStorage.setItem("accessToken", accessToken);
      console.log(accessToken);
      // Redirect user to profile page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

    }
  };

  const t = (e) => {
    e.preventDefault();
    console.log();

    login();
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    const hasReloaded = localStorage.getItem("login");
    localStorage.removeItem("profile");
    if (!hasReloaded) {
      // Reload the page only once
      localStorage.setItem("login", "true");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <div className="">
        <h1 className="text-black text-3xl font-extrabold text-center ml-12">
          Login
        </h1>
        <form onSubmit={t} className="flex flex-col ">
          <input
            type="email"
            value={email_}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
            placeholder="Enter the Email"
          />
          <input
            type="password"
            value={password_}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[120%] m-3 h-10 rounded-xl  border-[1px] p-2 text-center border-black"
            placeholder="Enter the Password"
          />
          
          <button
            type="submit"
            className="ml-12 w-[200px] inline-block px-5 py-2 mt-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 "
          >
            Proceed
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
