const userModel = require("../../models/User");
const followModel = require("../../models/Follow");
const postModel = require("../../models/Post");
const hasAccessToPage = require("../../utils/hasAccessToPage");
const { errorResponse, successResponse } = require("../../utils/responses");

exports.getPage = async (req, res) => {
    try {
        const { pageId } = req.params;
        const user = req.user;

        //*for checking user access to this page
        const hasAccess = await hasAccessToPage(user._id, pageId);

        // *find the user/page
        const page = await userModel
            .findById(pageId)
            .populate("name username isVerified")
            .lean();
        if (!page) {
            return errorResponse(res, 404, "صفحه کاربر مورد نظر یافت نشد");
        }

        // *show you dont have aceess to this page alert
        if (!hasAccess) {
            return errorResponse(
                res,
                403,
                "صفحه مورد نظر خصوصی است ، ابتدا شروع به دنبال کردن کنید",
            );
        }

        // *find  this pagefollowers
        let followers = await followModel
            .find({
                following: pageId,
            })
            .populate("follower", "username name");
        followers = followers.map((item) => item.follower);

        // *find this page followings
        let followings = await followModel
            .find({
                follower: pageId,
            })
            .populate("following", "username name");
        followings = followings.map((item) => item.following);

        // *show page posts
        let posts = await postModel.find({
            user: pageId,
        });

        // *check if user is following this page
        let isFollow = false;
        const followed = await followModel.findOne({
            follower: user._id,
            following: pageId,
        });
        if (followed) {
            isFollow = true;
        }

        // *remove sensitive data from the user object at response
        page.password = undefined;
        page.role = undefined;

        return res.json({ page, isFollow, followers, followings, posts });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};

exports.follow = async (req, res) => {
    try {
        const { pageId } = req.params;
        const user = req.user;

        const targetPage = await userModel.findById(pageId);
        if (!targetPage) {
            return errorResponse(res, 404, "صفحه‌ای برای این کاربر یافت نشد");
        }

        const isExistingFollwer = await followModel.findOne(
            { follower: user._id },
            { following: pageId },
        );
        if (isExistingFollwer) {
            return errorResponse(
                res,
                400,
                "شما قبلا این کاربر را دنبال کرده اید",
            );
        }

        if (user._id.toString() === pageId) {
            return errorResponse(
                res,
                403,
                "شما نمیتوانید خودتان را دنبال کنید",
            );
        }

        await followModel.create({
            follower: user._id,
            following: pageId,
        });

        return successResponse(res, 200, {
            message: "صفحه مورد نظر با موفقیت دنبال شد",
            follower: user._id,
            following: pageId,
        });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};

exports.unfollow = async (req, res) => {
    try {
        const { pageId } = req.params;
        const user = req.user;

        const isExistingFollwer = await followModel.findOneAndDelete(
            { follower: user._id },
            { following: pageId },
        );

        if (!isExistingFollwer) {
            return errorResponse(
                res,
                404,
                "شما نمیتوانید این صفحه را فالو کنید",
            );
        }

        return successResponse(res, 200, {
            message: "صفحه مورد نظر با موفقیت از دنبال شوندگان حذف شد",
            follower: user._id,
            following: pageId,
        });
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};
