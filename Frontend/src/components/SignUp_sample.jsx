import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../Schemas";

function SignUp_sample({ setLoading, setSuccess, setError }) {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
      const response = await axios.post("http://localhost:3000/user/signup", {
        userName: values.username,
        name: values.name,
        email: values.email,
        password: values.password,
      });
      const accessToken = response.data.accesstoken;
      localStorage.setItem("accessToken", accessToken);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setError("Signup failed. Please check your details and try again.");
    }
    setLoading(false);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Full Name"
        className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-yellow-400/60 outline-none"
      />
      {touched.name && errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
      <input
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Username"
        className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-yellow-400/60 outline-none"
      />
      {touched.username && errors.username && <span className="text-red-400 text-xs">{errors.username}</span>}
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
        className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-yellow-400/60 outline-none"
      />
      {touched.email && errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
        className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-yellow-400/60 outline-none"
      />
      {touched.password && errors.password && <span className="text-red-400 text-xs">{errors.password}</span>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-900 font-bold px-6 py-2 rounded-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/60 disabled:opacity-60"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUp_sample;
