import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.accessToken ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }


  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as {
      sub: string;
      role: "user" | "editor" | "admin";
    };

    const user = await User.findById(decoded.sub).select(
      "_id name email role status emailVerified subscriptionStatus"
    );

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    if (user.status !== "active") {
      return next(new ApiError(403, "Account is not active"));
    }

    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      subscriptionStatus: user.subscriptionStatus,
    };

    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};