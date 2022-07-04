import express from 'express';
import Peep from '../models/peepSchema.js';
import { body } from 'express-validator'

export const router = express.Router();

router.route('/')
    .get((req, res) => {

        Peep.find().sort('-date').find((error, peeps) => {
            error ? res.status(404).send({ message: `Peeps not found.` }) : res.status(200).send(peeps);
        });


    })

    .post([
        body('username').isString().exists().isLength({ min: 1 }),
        body('date').exists().isDate(),
        body('text').exists().isString().isLength({ min: 1 })

    ], (req, res) => {



        const peep = new Peep(req.body)
        console.log(peep)
        peep.save()
            .then(peep => {
                res.status(201).send({ 'message': 'Peep sent!' });
            })
            .catch(err => res.send({ 'message': 'Peep could not be sent' }));

    })


