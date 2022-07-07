import mongoose from 'mongoose';

const peepSchema = new mongoose.Schema({

    username: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true }
})


export default mongoose.model('Peep', peepSchema);