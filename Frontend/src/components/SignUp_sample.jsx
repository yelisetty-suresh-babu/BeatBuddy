import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../Schemas";

function SignUp_sample() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    actions.resetForm();
    signup_post(values);
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

  const signup_post = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        userName: values.username,
        name: values.name,
        email: values.email,
        password: values.password,
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

  return (
    <>
      <div className="  ">
        <h1 className="text-black text-3xl font-extrabold text-center ml-12">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={handleChange}
            className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
            placeholder="Enter the name"
          />
          <input
            type="text"
            id="username"
            value={values.username}
            onChange={handleChange}
            className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
            placeholder="Enter the User Name"
          />

          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            // className="w-[120%] m-3 h-10 rounded-xl border-[1px] p-2 text-center border-black"
            className={`w-[120%] m-3 h-10 rounded-lg border-[1px] p-2 text-center outline-none  ${
                errors.email && touched.email
                  ? "border-red-500"
                  : touched.email
                  ? "border-green-500"
                  : "border-black"
              }`}
            placeholder="Enter the Email"
          />

          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[120%] m-3 h-10 rounded-lg border-[1px] p-2 text-center outline-none  ${
              errors.password && touched.password
                ? "border-red-500"
                : touched.password
                ? "border-green-500"
                : "border-black"
            }`}
            placeholder="Enter the Password"
          />
          {errors.password && touched.password && (
            <p className="text-red-400 ml-5 mb-2">{errors.password}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`ml-10 w-[200px] inline-block px-5 py-2 mt-2 text-white bg-blue-600 rounded-lg ${
              isSubmitting && "opacity-[0.35]"
            }`}
          >
            Proceed
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp_sample;
