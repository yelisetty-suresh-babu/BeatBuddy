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

export const SignupSchema = yup.object().shape({
  name: yup.string().required("name is Required"),
  username: yup.string().required("Username is Required"),
  email: yup
    .string()
    .email("Enter a Valid Email")
    .required("Email is Required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, {
      message: "please create a strong password",
    })
    .required("Password is Required"),
});
