import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// matches 6 chars,1 upper case , 1 lower case , 1 numeric digit

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a Valid Email")
    .required("Email is Required"),
  password: yup
    .string()
    // .min(6)
    // .matches(passwordRules, {
    //   message: "please create a strong password",
    // })
    .required("Password is Required"),
});

// confirm password :yup.string().oneOf([yup.ref('password'),null],"password must match").required("required")

// export const SignupSchema = yup.object().shape({
//   name: yup.string().required("name is Required"),
//   username: yup.string().required("Username is Required"),
//   email: yup
//     .string()
//     .email("Enter a Valid Email")
//     .required("Email is Required"),
//   password: yup
//     .string()
//     .min(6)
//     .matches(passwordRules, {
//       message: "please create a strong password",
//     })
//     .required("Password is Required"),
// });

// Create the SignupSchema using Yup
export const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Name can only contain alphabets")
    .required("Name is required"),

  username: yup.string().required("Username is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .matches(/^[A-Za-z]/, "Email must start with an alphabet")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "enter a strong password")
    .matches(passwordRules, {
      message: "password should be strong",
    })
    .required("Password is required"),
});
