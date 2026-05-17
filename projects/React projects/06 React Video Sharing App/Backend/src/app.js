import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import userRoutes from "./routes/users.routes.js";
import videoRoutes from "./routes/videos.routes.js";
import commentRoutes from "./routes/comments.routes.js";
import watchHistoryRoutes from "./routes/watchHistory.routes.js";


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/watchHistory", watchHistoryRoutes);

app.use(errorHandler)

export { app };
