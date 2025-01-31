const express = require("express");
const cors = require("cors");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./modules/auth/auth.routes");
const postRoutes = require("./modules/posts/post.routes");
const pageRoutes = require("./modules/pages/page.routes");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const app = express();

// *body parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//*cookie parser
app.use(cookieParser());

//*static path
app.use("/posts", express.static(path.join(__dirname, "public/posts")));
app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));

// *cors policy
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

// *routes
app.use("/v1/auth", authRoutes);
app.use("/v1/posts", postRoutes);
app.use("/v1/pages", pageRoutes);

//*not found error
app.use((req, res) => {
    console.log("This page does not exist, your path: ", req.path);
    res.status(404).json("Page not found");
});

//! neded feature
// app.use(errorHandler)

module.exports = app;
