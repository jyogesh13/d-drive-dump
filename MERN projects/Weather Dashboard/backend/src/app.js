import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import errorHandler  from "./middlewares/error.middleware.js";

const app = express();

app.use(json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

import userRoutes from "./routes/user.routes.js";
import weatherRoutes from "./routes/weather.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/weather", weatherRoutes);

app.use(errorHandler);

export { app };
