const { errorResponse } = require("../utils/responses");

module.exports = async (req, res, next) => {
    try {
        const isVerified = req.user.isVerified;
        if (!isVerified) {
            return errorResponse(res, 403, "لطفا حساب خود را تایید کنید");
        }
        next();
    } catch (err) {
        return errorResponse(res, 500, "خطای سرور", err);
    }
};
