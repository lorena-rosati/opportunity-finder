import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: "opportunities" }]
});

export const UserModel = mongoose.model("users", UserSchema); //collection called users