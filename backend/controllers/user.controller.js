import Peep from "../models/peepSchema.js";

const userControllers = {
    // allAccess: function (req, res) { res.status(200).send(`Public Content`) }, //for guest role for non-login access

    userBoard: function (req, res) {

        Peep.find().sort('-date').find((error, peeps) => {
            error ? res.status(404).send({ message: `Peeps not found.` }) : res.status(200).send(peeps);
        });

    }, //standard user 
    adminBoard: function (req, res) { res.status(200).send(`Admin Content`) }, //for future role to be added

};



export default userControllers;
