import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";

export const registerUser = async (payload: {
    name: string;
    username?: string;
    email: string;
    password: string;
}) => {
    const email = payload.email.toLowerCase().trim();

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new ApiError(409, "Email already in use");
    }

    if (payload.username) {
        const existingUsername = await User.findOne({
            username: payload.username.toLowerCase().trim(),
        });

        if (existingUsername) {
            throw new ApiError(409, "Username already in use");
        }
    }

    const passwordHash = await bcrypt.hash(
        payload.password,
        env.BCRYPT_SALT_ROUNDS
    );

    const user = await User.create({
        name: payload.name.trim(),
        username: payload.username?.toLowerCase().trim(),
        email,
        passwordHash,
        role: "user",
        status: "active",
        authProvider: "credentials",
    });

    return {
        user,
        accessToken: signAccessToken({
            _id: user._id.toString(),
            role: user.role,
        }),
        refreshToken: signRefreshToken({
            _id: user._id.toString(),
            role: user.role,
        }),
    };
};

export const loginUser = async (payload: {
    email: string;
    password: string;
}) => {
    const email = payload.email.toLowerCase().trim();

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (user.status !== "active") {
        throw new ApiError(403, "Account is not active");
    }

    user.lastLoginAt = new Date();
    await user.save();

    return {
        user,
        accessToken: signAccessToken({
            _id: user._id.toString(),
            role: user.role,
        }),
        refreshToken: signRefreshToken({
            _id: user._id.toString(),
            role: user.role,
        }),
    };
};