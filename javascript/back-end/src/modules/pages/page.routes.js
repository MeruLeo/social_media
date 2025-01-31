const express = require("express");
const pageControllers = require("./page.controllers");
const auth = require("../../middlewares/auth");
const { createMulterUploader } = require("../../middlewares/uploaderConfigs");

const router = express.Router();

const avatarUploader = createMulterUploader({
    destination: "src/public/avatars",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
});

router.get("/:pageId", auth, pageControllers.getPage);
router.post("/:pageId/follow", auth, pageControllers.follow);
router.post("/:pageId/unfollow", auth, pageControllers.unfollow);
router.put("/:pageId/edit", auth, pageControllers.edit);
router.put(
    "/:pageId/edit/avatar",
    auth,
    avatarUploader.single("avatar"),
    pageControllers.editAvatar,
);

module.exports = router;
