import mongoose from 'mongoose';

const peepSchema = new mongoose.Schema({

    username: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true }
})


const Peep = mongoose.model('Peep', peepSchema);

export default Peep;