import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './routes/users.js';
import pins from './routes/pins.js'

const app = express();
dotenv.config();
const pinRoute = pins;
const userRoute = users;

app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);




app.listen(8800, () => {
  console.log("Backend server is running ");
});
