import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({

    name: { type: String, required: true },
})




export default new mongoose.model('Role', roleSchema);