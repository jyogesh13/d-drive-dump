import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { safeUser } from "../utils/safeUser.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const result = await registerUser(req.body);

    res.status(201).json({
        message: "Registered successfully",
        user: safeUser(result.user),
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const result = await loginUser(req.body);

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
        message: "Login successful",
        user: safeUser(result.user),
    });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
        user: req.user,
    });
});