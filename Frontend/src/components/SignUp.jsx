import React, { useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { authActions } from "../../store/store";
function SignUp() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name_, setName] = useState("");

  const [userName_, setUserName] = useState("");
  const [email_, setEmail] = useState("");
  const [password_, setPassword] = useState("");

  const signup_post = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        userName: userName_,
        name: name_,
        email: email_,
        password: password_,
      });
      const accessToken = response.data.accesstoken;

      // Store the access token in local storage
      localStorage.setItem("accessToken", accessToken);

      // Redirect user to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const t = (e) => {
    e.preventDefault();

    signup_post();

    setName("");
    setUserName("");

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="  ">
        <h1 className="text-black text-3xl font-extrabold text-center ml-12">
          Sign Up
        </h1>
        <form onSubmit={t} className="flex flex-col ">
          <input
            type="text"
            value={name_}
            onChange={(e) => setName(e.target.value)}
            className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
            placeholder="Enter the name"
          />
          <input
            type="text"
            value={userName_}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
            placeholder="Enter the Username"
          />

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
            className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
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

export default SignUp;
