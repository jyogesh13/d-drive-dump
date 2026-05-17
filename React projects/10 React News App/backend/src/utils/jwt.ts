import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

export const signAccessToken = (user: { _id: string, role: string }) => {
    return jwt.sign(
        {
            role: user.role
        },
        env.ACCESS_TOKEN_SECRET,
        {
            subject: user._id,
            expiresIn: env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const signRefreshToken = (user: { _id: string, role: string }) => {
    return jwt.sign(
        {
            role: user.role
        },
        env.REFRESH_TOKEN_SECRET,
        {
            subject: user._id,
            expiresIn: env.REFRESH_TOKEN_EXPIRY
        }
    )
}