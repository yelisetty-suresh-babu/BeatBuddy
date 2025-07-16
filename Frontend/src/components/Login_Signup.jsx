import React, { useEffect, useState } from "react";
import Login_sample from "./Login_sample";
import SignUp_sample from "./SignUp_sample";

function Login_Signup() {
  const [signed, setSigned] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("login");
    localStorage.removeItem("profiles");
    if (!hasReloaded) {
      localStorage.setItem("login", "true");
      window.location.reload();
    }
    localStorage.removeItem("cachedData");
    localStorage.removeItem("savedLink");
  }, []);

  // Pass loading, success, error, and their setters to children
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-10 px-2">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col items-center p-8">
        <div className="flex justify-evenly w-full items-center mb-8 gap-4">
          <button
            onClick={() => { setSigned("signup"); setError(""); setSuccess(""); }}
            className={`w-1/2 py-2 rounded-lg font-bold text-lg transition-all ${signed === "signup" ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 shadow" : "bg-white/20 text-white hover:bg-yellow-400/30 hover:text-yellow-300"}`}
          >
            Signup
          </button>
          <button
            onClick={() => { setSigned("login"); setError(""); setSuccess(""); }}
            className={`w-1/2 py-2 rounded-lg font-bold text-lg transition-all ${signed === "login" ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 shadow" : "bg-white/20 text-white hover:bg-yellow-400/30 hover:text-yellow-300"}`}
          >
            Login
          </button>
        </div>
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-wider">
          {signed === "signup" ? "Create an Account" : "Welcome Back"}
        </h1>
        {signed === "signup" ? (
          <SignUp_sample setLoading={setLoading} setSuccess={setSuccess} setError={setError} />
        ) : (
          <Login_sample setLoading={setLoading} setSuccess={setSuccess} setError={setError} />
        )}
        {/* Move feedback below the form */}
        {error && (
          <div className="w-full text-center text-red-400 font-semibold mt-4 bg-red-900/30 rounded-lg py-2 px-3 animate-fade">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full text-center text-green-400 font-semibold mt-4 bg-green-900/30 rounded-lg py-2 px-3 animate-fade">
            {success}
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center mt-4 animate-fade">
            <span className="animate-bounce text-2xl text-yellow-400 mb-1">● ● ●</span>
            <span className="text-white/80 text-sm">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login_Signup;
