import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from './routes/user.js';
import {opportunitiesRouter} from './routes/opportunities.js';


const app = express();

app.use(express.json()); //converts data from front-end into json
app.use(cors());

app.use("/auth", userRouter);
app.use("/opportunities", opportunitiesRouter);


mongoose.connect("mongodb+srv://lirosati:dqIgjctgohZK7CkH@opportunities.ogcb8ku.mongodb.net/opportunities?retryWrites=true&w=majority",

{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

app.listen(3001, () => console.log("Server started")); //tells api to start, callback function runs when call starts
