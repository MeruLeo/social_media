const userModel = require("../../models/User");
const RefreshToken = require("../../models/RefreshToken");
const { errorResponse, successResponse } = require("../../utils/responses");
const registerValidationScheme = require("./auth.validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { username, email, name, password, bio } = req.body;

        await registerValidationScheme.validate(
            { username, email, name, password, bio },
            { abortEarly: false },
        );

        const isExistUser = await userModel.findOne({
            $or: [{ username }, { email }],
        });
        if (isExistUser) {
            return errorResponse(
                res,
                400,
                "کاربری با این ایمیل یا نام کاربری قبلا عضو شده است",
            );
        }

        const isFirstUser = (await userModel.countDocuments()) === 0;
        let role = "user";
        if (isFirstUser) {
            role = "admin";
        }

        const newUser = new userModel({
            username,
            email,
            name,
            password,
            role,
            bio,
        });
        await newUser.save();

        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "30day",
            },
        );
        const refreshToken = await RefreshToken.createToken(newUser);

        res.cookie("access-token", accessToken, {
            maxAge: 900_000,
            httpOnly: true,
        });
        res.cookie("refresh-token", refreshToken, {
            maxAge: 900_000,
            httpOnly: true,
        });

        successResponse(res, 201, {
            message: "حساب کاربری با موفقیت ایجاد شد",
            user: { ...newUser.toObject(), password: undefined },
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res, 500, "خطای سرور", err.message);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return errorResponse(res, 401, "ایمیل یا رمز عبور معتبر نیست");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 401, "ایمیل یا رمز عبور معتبر نیست");
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "30day",
            },
        );
        const refreshToken = await RefreshToken.createToken(user);

        res.cookie("access-token", accessToken, {
            maxAge: 900_000,
            httpOnly: true,
        });
        res.cookie("refresh-token", refreshToken, {
            maxAge: 900_000,
            httpOnly: true,
        });
        successResponse(res, 200, {
            message: "موفقیت وارد شدید",
            user: { ...user.toObject(), password: undefined },
            accessToken,
            refreshToken,
        });
    } catch (err) {
        return errorResponse(res, 500, "خطای سرور", err.message);
    }
};
