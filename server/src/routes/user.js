//Encompasses everything related to logging in and registering

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
import { UserModel } from "../models/Users.js";

//creating new user endpoint??
router.post("/register", async (req, res) => { //this is an api endpoint??
    const { username, password } = req.body; //defining endpoints for api
    const user = await UserModel.findOne({ username });

    if (user) { //trying to register with a username that already exists
        return res.json({ message: "User already exists!" });
    }

    const hashedPswd = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPswd});
    await newUser.save(); //creates new user

    res.json({message: "Registration completed! Now login"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) { //user doesn't exist
        return res.json({ message: "User doesn't exist." });
    }

    const isPswdValid = await bcrypt.compare(password, user.password);

    if (!isPswdValid) {
        return res.json({ message: "Username or password is incorrect." });
    }

    const token = jwt.sign({id: user._id}, "secret");
    return res.json({token, userID: user._id, message: ""});
});

export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (error) => {
            if (error) return res.sendStatus(403);
            next(); //let user continue
        });
    } else {
        res.sendStatus(401);
    }
}