const express = require("express");
const pageControllers = require("./page.controllers");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/:pageId", auth, pageControllers.getPage);
router.post("/:pageId/follow", auth, pageControllers.follow);
router.post("/:pageId/unfollow", auth, pageControllers.unfollow);

module.exports = router;
