const {
    default: postValidationSchema,
} = require("../../../../shared/schemas/post");
const postModel = require("../../models/Post");
const { errorResponse, successResponse } = require("../../utils/responses");

exports.create = async (req, res) => {
    const { caption, hashtags } = req.body;
    const user = req.user;

    try {
        const tags = hashtags.split(",");

        if (!req.file) {
            return errorResponse(res, 400, "لطفا ابتدا یک فایل آپلود کنید");
        }

        // await postValidationSchema.validate({ caption }, { abortEarly: false });

        const mediaUrlPath = `posts/${req.file.filename}`;

        const post = new postModel({
            media: {
                path: mediaUrlPath,
                filename: req.file.originalname,
            },
            caption,
            hashtags: tags,
            user: user._id,
        });
        await post.save();

        return successResponse(res, 201, {
            message: "پست با موفقیت ایجاد شد",
            post,
        });
    } catch (err) {
        return errorResponse(res, 500, "خطای سرور", err.message);
    }
};
