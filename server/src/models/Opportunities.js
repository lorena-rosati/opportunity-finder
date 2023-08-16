import mongoose from "mongoose";

const OpportunitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    labels: [{
        type: String,
        required: true
    }],
    userOwner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true
    }
});

//opportunities is the collection name, OpportunitiesSchema is the schema for how documents in the collection are structured
export const OpportunitiesModel = mongoose.model("opportunities", OpportunitiesSchema);