import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';


import { router as peepRouter } from './routes/peeps.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app = express();
const port = process.env.PORT
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


const main = async () => {
    console.log(`Connecting to: ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
}

main().catch(error => console.log(error));



app.use('/', peepRouter);




const server = app.listen(port, () => {
    const SERVERPORT = server.address().port;
    console.log(`Example app listening at http://localhost:${SERVERPORT}`)
});


export default server