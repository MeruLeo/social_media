const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const { errorResponse } = require("../utils/responses");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"];
        if (!token) {
            return errorResponse(
                res,
                401,
                "لطفا ابتدا وارد حساب کاربری خود بشوید",
            );
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            return errorResponse(
                res,
                401,
                "لطفا ابتدا وارد حساب کاربری خود بشوید",
            );
        }

        const userId = payload.userId;
        const user = await userModel.findById(userId);

        if (!user) {
            return errorResponse(
                res,
                401,
                "لطفا ابتدا وارد حساب کاربری خود بشوید",
            );
        }

        req.user = user;

        next();
    } catch (err) {
        return errorResponse(res, 500, "خطای سرور", err);
    }
};
