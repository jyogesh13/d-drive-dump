import express, { urlencoded } from "express";
import errorHandler from "./middlewares/error.middleware.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({limit: "16kb"}));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(clerkMiddleware());

import chatRoutes from "./routes/chat.routes.js"

app.use("/api/v1/chats", chatRoutes);

app.use(errorHandler)

export { app };
