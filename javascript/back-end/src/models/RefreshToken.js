const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expire: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
);

schema.statics.createToken = async (user) => {
    const expireIn = +process.env.REFRESH_TOKEN_EXPIRE;
    const token = uuidv4();
    const refreshTokenDocument = new model({
        user: user._id,
        token,
        expire: new Date(Date.now() + expireIn * 24 * 60 * 60 * 1000),
    });

    await refreshTokenDocument.save();
    return token;
};
schema.statics.verifyToken = async (token) => {
    const refreshToken = await RefreshToken.findOne({ token });
    if (!refreshToken || refreshToken.expire < new Date()) {
        throw new Error("Invalid refresh token");
    }

    return refreshToken.user;
};

const model = mongoose.model("RefreshToken", schema);

module.exports = model;
