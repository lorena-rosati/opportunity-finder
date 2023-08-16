import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: "opportunities" }]
});

//users is the collection name, UserSchema is the schema for how documents in the collection are structured
export const UserModel = mongoose.model("users", UserSchema); 