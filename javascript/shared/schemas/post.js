const yup = require("yup");

const postValidationSchema = yup.object({
    caption: yup.string().max(2200, "کپشن بسیار طولانی است"),
});

module.exports = postValidationSchema;
