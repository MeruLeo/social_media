const yup = require("yup");

const registerValidationScheme = yup.object({
    email: yup
        .string()
        .email("please enter the valid email")
        .required("email is required"),
    password: yup
        .string()
        .min(8, "password must be at least 8 characters")
        .required("password is required"),
    username: yup
        .string()
        .min(3, "username must be at least 3 characters")
        .max(20, "username must be at most 20 characters")
        .required("username is required"),
    name: yup
        .string()
        .min(3, "name must be at least 3 characters")
        .max(50, "name must be at most 50 characters")
        .required("name is required"),
    biography: yup
        .string()
        .max(65, "bio must be at most 65 characters")
        .optional(),
});

module.exports = registerValidationScheme;
