import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Schemas";

function Login_sample() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (values, actions) => {
    console.log(values, actions);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    actions.resetForm();
    login(values);
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
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });


//   console.log(errors);
  const login = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: values.email,
        password: values.password,
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

 
//   useEffect(() => {
//     const hasReloaded = localStorage.getItem("login");
//     localStorage.removeItem("profile");
//     if (!hasReloaded) {
//       // Reload the page only once
//       localStorage.setItem("login", "true");
//       window.location.reload();
//     }
//   }, []);

  //   console.log(formik);

    
  return (
    <>
      <div className="">
        <h1 className="text-black text-3xl font-extrabold text-center ml-12">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[120%] m-3 h-10 rounded-lg border-[1px] p-2 text-center outline-none  ${
              errors.email && touched.email
                ? "border-red-500"
                : touched.email
                ? "border-green-500"
                : "border-black"
            }`}
            placeholder="Enter the Email"
          />
          {errors.email && touched.email && (
            <p className="text-red-400 ml-5">{errors.email}</p>
          )}

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

export default Login_sample;
