import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router(); //router for all the /auth specific code - handling all requests related to authentication / accounts
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => { 
    const { username, password } = req.body; //shorthand for assigning req.body.username and req.body.password to username and password, respectively
    const user = await UserModel.findOne({ username });  //find document in user collection w/ the username equal to the value of the username variable

    if (user) { //trying to register with a username that already exists
        return res.json({ message: "User already exists!" });
    }

    const hashedPswd = await bcrypt.hash(password, 10); //hash the password
    const newUser = new UserModel({username, password: hashedPswd}); //creates new user with the username and password
    await newUser.save(); //saves the new user to the collection

    res.json({message: "Registration completed! Now login"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) { //user doesn't exist
        return res.json({ message: "User doesn't exist." });
    }

    const isPswdValid = await bcrypt.compare(password, user.password); //compare password in collection with hashed version of password inputted

    if (!isPswdValid) {
        return res.json({ message: "Username or password is incorrect." });
    }

    const token = jwt.sign({id: user._id}, "secret");
    return res.json({token, userID: user._id, message: ""});
});

export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; //extracts authorization token from the http request
    if (token) { //token exists
        jwt.verify(token, "secret", (error) => { //verifies the token's validity using secret key
            if (error) return res.sendStatus(403);
            next(); //let user continue
        });
    } else {
        res.sendStatus(401);
    }
}