const { errorResponse } = require("./responses");
const userModel = require("../models/User");
const followModel = require("../models/Follow");

module.exports = async (userId, pageId) => {
    try {
        if (userId.toString() === pageId.toString()) return true;

        const page = await userModel.findById(pageId);
        if (!page.private) return true;

        const followed = await followModel.findOne({
            follower: userId,
            following: pageId,
        });
        if (!followed) return false;

        return true;
    } catch (err) {
        return false;
    }
};
