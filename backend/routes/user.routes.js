import express from 'express';

import userControllers from '../controllers/user.controller.js';
import middlewareConfig from '../middlewares/index.js';

const { userBoard, adminBoard } = userControllers;
const { authJwt } = middlewareConfig;


const userRouter = express.Router();

userRouter.use((req, res, next) => {
    res.header(
        `Access-Control-Allow-Headers`,
        `x-access-token, Origin, Content-Type, Accept`
    );
    next();
});

userRouter.get(`/user`, [authJwt.verifyToken], userBoard);
userRouter.get(`/admin`, [authJwt.verifyToken, authJwt.isAdmin], adminBoard); //not used in this sprint

//might need to add pee.js functions to userController but will see in the future, might have a work away around this in the frontend

export default userRouter