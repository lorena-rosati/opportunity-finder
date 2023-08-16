import express from "express";
import { OpportunitiesModel } from "../models/Opportunities.js";
import { UserModel } from "../models/Users.js";
import {verifyToken} from "./user.js";

const router = express.Router(); //router for all the /opportunities specific code - handling all requests related to opportunities

router.get("/", async (req, res) => { 
    try {
        const response = await OpportunitiesModel.find({}); //finding all opportunities
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", verifyToken, async (req, res) => { //post request - creating new opportunities
    const opportunity = new OpportunitiesModel(req.body);
    try {
        const response = await opportunity.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put("/", verifyToken, async (req, res) => { //saving opportunities
    try {
        const opportunity = await OpportunitiesModel.findById(req.body.opportunityID);
        const user = await UserModel.findById(req.body.userID);
        user.savedOpportunities.push(opportunity);
        await user.save();
        res.json({savedOpportunities: user?.savedOpportunities}); //question mark: if it evaluates to null, returns undefined instead of an error
    } catch (error) {
        res.json(error);
    }
});

router.put("/unsave", verifyToken, async (req, res) => { //unsaving opportunities
    try {
        const opportunity = await OpportunitiesModel.findById(req.body.opportunityID);
        const user = await UserModel.findById(req.body.userID);
        user.savedOpportunities = user.savedOpportunities.filter((opp) => {
            return !opp._id.equals(opportunity._id); //return all opportunities which do not have the id of the opportunity that is being unsaved
        });
        await user.save();
        res.json({savedOpportunities: user?.savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedOpportunities/ids/:userID", async (req, res) => { //get request used to obtain the ids of all the user's saved opportunities
    try { //used on the home page to monitor and display whether each opportunity is saved or not
        const user = await UserModel.findById(req.params.userID);
        res.json({savedOpportunities: user?.savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedOpportunities/:userID", async (req, res) => { //get request used to obtain all the opportunity information of the user's saved opportunities
    try { //used on the saved opportunities page
        const user = await UserModel.findById(req.params.userID);
        const savedOpportunities = await OpportunitiesModel.find({ //find opportunity documents which match the ids of the user's saved opportunities
            //_id refers to the _id fiel in the opportunity documents
            //$in - MongoDB operator which checks if the value on the left is in the array on the right
            _id: { $in: user.savedOpportunities }, 
        });
        res.json({savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

export { router as opportunitiesRouter }


