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

        if (!user) {
            return errorResponse(res, 401, "کاربر احراز هویت نشده است.");
        }

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
                {
                    username: page.username,
                    name: page.name,
                },
            );
        }

        // *find  this pagefollowers
        let followers = await followModel
            .find({
                following: pageId,
            })
            .populate("follower", "username name avatar");
        followers = followers.map((item) => item.follower);

        // *find this page followings
        let followings = await followModel
            .find({
                follower: pageId,
            })
            .populate("following", "username name avatar");
        followings = followings.map((item) => item.following);

        // *show page posts
        let posts = await postModel
            .find({
                user: pageId,
            })
            .lean()
            .sort({ createdAt: -1 });

        // *check if user is following this page
        let isFollow = false;
        const followed = await followModel.findOne({
            follower: user._id,
            following: pageId,
        });
        if (followed) {
            isFollow = true;
        }

        //*checking own page
        const isOwnPage = user._id.toString() === pageId;

        // *remove sensitive data from the user object at response
        page.password = undefined;
        page.role = undefined;

        return res.json({
            page,
            isFollow,
            followers,
            followings,
            posts,
            isOwnPage,
        });
    } catch (err) {
        return errorResponse(res, 500, err.message, {
            message: "خطای سمت سرور",
        });
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

        const isExistingFollwer = await followModel.findOne({
            follower: user._id,
            following: pageId,
        });
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

        const isExistingFollwer = await followModel.findOneAndDelete({
            follower: user._id,
            following: pageId,
        });
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

exports.edit = async (req, res) => {
    try {
        const { pageId } = req.params;
        const updates = req.body;
        const user = req.user;

        if (user._id.toString() !== pageId) {
            return errorResponse(
                res,
                403,
                "شما اجازه ویرایش این صفحه را ندارید",
            );
        }

        const allowedFields = ["name", "username", "email", "bio", "private"];
        const filteredUpdates = Object.keys(updates)
            .filter((field) => allowedFields.includes(field))
            .reduce((obj, field) => {
                obj[field] = updates[field];
                return obj;
            }, {});

        if (Object.keys(filteredUpdates).length === 0) {
            return errorResponse(
                res,
                400,
                "هیچ فیلد معتبری برای ویرایش ارسال نشده است",
            );
        }

        const updatedPage = await userModel.findByIdAndUpdate(
            pageId,
            filteredUpdates,
            {
                new: true,
                runValidators: true,
            },
        );

        return successResponse(res, 200, updatedPage);
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyPattern?.username) {
                return errorResponse(
                    res,
                    400,
                    "این نام کاربری قبلاً انتخاب شده است. لطفاً نام دیگری انتخاب کنید.",
                );
            }
            if (err.keyPattern?.email) {
                return errorResponse(
                    res,
                    400,
                    "این ایمیل قبلاً ثبت شده است. لطفاً ایمیل دیگری وارد کنید.",
                );
            }
        }
        return errorResponse(res, 500, err.message);
    }
};

exports.editAvatar = async (req, res) => {
    const user = req.user;

    try {
        if (!req.file) {
            return errorResponse(res, 400, "لطفا ابتدا یک فایل آپلود کنید");
        }

        const avatarUrlPath = `avatars/${req.file.filename}`;

        const updatedUserAvatar = await userModel.findByIdAndUpdate(user._id, {
            avatar: {
                path: avatarUrlPath,
                filename: req.file.originalname,
            },
        });

        return successResponse(res, 200, updatedUserAvatar);
    } catch (err) {
        return errorResponse(res, 500, err.message);
    }
};
