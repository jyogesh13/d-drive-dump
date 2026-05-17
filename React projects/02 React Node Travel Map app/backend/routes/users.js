import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();
const saltRounds = 10;

//Register
router.post("/register", async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new username
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        //find User
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Wrong username or password!");

        //validate password
        const validPassword = bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong username or password!");

        //send res
        res.status(200).json({_id:user._id,username:user.username})
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
