import mongoose from "mongoose";

//NOTE: this is the schema for the login details not the profile information which may be a feature which is added in a later sprint (or that may be extdend to this schema)

const userSchema = new mongoose.Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]

})


export default mongoose.model(`User`, userSchema);