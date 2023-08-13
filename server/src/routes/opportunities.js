import express from "express";
import { OpportunitiesModel } from "../models/Opportunities.js";
import { UserModel } from "../models/Users.js";
import {verifyToken} from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await OpportunitiesModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", verifyToken, async (req, res) => { //post because were creating smth
    const opportunity = new OpportunitiesModel(req.body);
    try {
        const response = await opportunity.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

//route that will allow us to save an opportunity
router.put("/", verifyToken, async (req, res) => { 
    try {
        const opportunity = await OpportunitiesModel.findById(req.body.opportunityID);
        const user = await UserModel.findById(req.body.userID);
        user.savedOpportunities.push(opportunity);
        await user.save();
        res.json({savedOpportunities: user?.savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

router.put("/unsave", verifyToken, async (req, res) => {
    try {
        const opportunity = await OpportunitiesModel.findById(req.body.opportunityID);
        const user = await UserModel.findById(req.body.userID);
        user.savedOpportunities = user.savedOpportunities.filter((opp) => {
            return !opp._id.equals(opportunity._id);
        });
        await user.save();
        res.json({savedOpportunities: user?.savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedOpportunities/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedOpportunities: user?.savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedOpportunities/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedOpportunities = await OpportunitiesModel.find({
            _id: { $in: user.savedOpportunities },
        });
        res.json({savedOpportunities});
    } catch (error) {
        res.json(error);
    }
});

export { router as opportunitiesRouter }


