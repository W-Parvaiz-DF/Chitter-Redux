import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { validationResult } from "express-validator";
import Role from "../models/roleSchema.js"; //will be used in signup function
import User from "../models/userSchema.js"

//sign-up function will be written here when adding that part currently leaving out for simplicity




//sign-in function

const signin = (req, res) => {

    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            const err = new Error(`Validation failed`);
            err.statusCode = 422;
            err.data = errors.array();
            throw err;
        }
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode ?? 500).send({ message: err.data });
    }

    User.findOne({ email: req.body.email }).populate(`roles`, `-__v`).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: `User not found` });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {

            return res.status(401).send({
                accessToken: null,
                message: "Invalid password"
            });

        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

        const authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });

    });

}

const signingFunctions = { signin }; //signup will be included when written 


export default signingFunctions;