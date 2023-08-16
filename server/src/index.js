import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from './routes/user.js';
import {opportunitiesRouter} from './routes/opportunities.js';


const app = express(); //creates express application

app.use(express.json()); //adds the middleware express.json(), which is used to convert data from front-end (requests) into json
app.use(cors()); //adds cors middleware

//mounts the routers at specific routes
app.use("/auth", userRouter); //middleware in userRouter will be executed when a request is for the /auth route
app.use("/opportunities", opportunitiesRouter); //middleware in opportunitiesRouter will be executed when a request is for the /opportunities route

//establish connection to the mongodb database
mongoose.connect("mongodb+srv://lirosati:dqIgjctgohZK7CkH@opportunities.ogcb8ku.mongodb.net/opportunities?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

//starts the server; the server will listen for incoming requests from port 3001
app.listen(3001, () => console.log("Server started")); 