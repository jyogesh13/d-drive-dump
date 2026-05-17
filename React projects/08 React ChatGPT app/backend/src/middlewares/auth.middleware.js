import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";

const jwtAuth = asyncHandler(async (req, _, next) => {
  const { userId, sessionId } = getAuth(req);
  if (!userId || !sessionId) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }
  next();
});

export { jwtAuth };
