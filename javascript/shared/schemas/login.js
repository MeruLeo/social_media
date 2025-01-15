import * as yup from "yup";

const loginValidationScheme = yup.object({
    email: yup
        .string()
        .email("please enter the valid email")
        .required("email is required"),
    password: yup
        .string()
        .min(8, "password must be at least 8 characters")
        .required("password is required"),
});

export default loginValidationScheme; // برای ES Modules
module.exports = loginValidationScheme; // برای CommonJS
