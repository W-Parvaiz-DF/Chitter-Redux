import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import Role from '../models/roleSchema.js';


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: `No token provided` });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: `Unauthorised` });
        }

        req.userId = decoded.id;
        next();

    });

};

//for admin role which is not gonna be added right now

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find({ _id: { $in: user.roles } }, (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === `admin`) {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: `Request requires Admin role` });
            return;
        });
    });
};


const authJwt = {

    verifyToken,
    isAdmin

};

export default authJwt;