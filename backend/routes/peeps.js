import express from 'express';
import Peep from '../models/peepSchema.js';


export const router = express.Router();

router.route('/')
    .get((req, res) => {

        Peep.find().sort('-date').find((error, peeps) => {
            error ? res.status(404).send({ message: `Peeps not found.` }) : res.status(200).send(peeps);
        });


    })