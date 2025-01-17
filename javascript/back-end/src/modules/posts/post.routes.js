const express = require("express");
const postControllers = require("./post.controller");
const auth = require("../../middlewares/auth");
const accountVerify = require("../../middlewares/accountVerify");
const {
    multerStorage,
    createMulterUploader,
} = require("../../middlewares/uploaderConfigs");
const multer = require("multer");

const postUploader = createMulterUploader({
    destination: "public/posts",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
});

const router = express.Router();

router.post(
    "/",
    auth,
    postUploader.single("media"),
    accountVerify,
    postControllers.create,
);

module.exports = router;
