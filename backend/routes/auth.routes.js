import express from 'express';
import { body } from 'express-validator';

// import middlewareConfig from '../middlewares/index.js';

import signingFunctions from '../controllers/auth.controller.js';

const { signin } = signingFunctions; //include sign up here

// const { verifySignUp } = middlewareConfig;


const authRouter = express.Router();


authRouter.use((req, res, next) => {
    res.header(
        `Access-Control-Allow-Headers`,
        `x-access-token, Origin, Content-Type, Accept`
    );
    next();

});

//signup route here for register page

authRouter.post(`/signin`, [


    body(`email`).exists().escape(),
    body(`password`).exists().escape(),


], signin);


export default authRouter
