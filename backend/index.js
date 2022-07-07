import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';


import Role from './models/roleSchema.js';


import { router as peepRouter } from './routes/peeps.js';
import userRouter from './routes/user.routes.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app = express();
const port = process.env.PORT
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


const main = async () => {
    console.log(`Connecting to: ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
}

main().catch(error => console.log(error));



//function to add roles to the database if none are present

const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: `user`
            }).save(err => {
                if (err) {
                    console.log(`error`, err);
                }
                console.log(`Added 'user' to roles collection`);
            });


            new Role({
                name: `admin`
            }).save(err => {
                if (err) {
                    console.log(`error`, err);
                }
                console.log(`Added 'admin' to roles collection`);
            });
        }
    });
}





app.use('/', peepRouter);
app.use('/', userRouter);
app.use('/', authRouter)




initial();

const server = app.listen(port, () => {
    const SERVERPORT = server.address().port;
    console.log(`Example app listening at http://localhost:${SERVERPORT}`)
});


export default server

