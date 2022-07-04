import chai from "chai";
import { expect } from 'chai';
import chaiHttp from "chai-http";
import server from "../index.js";

import Peep from '../models/peepSchema.js'

chai.use(chaiHttp);
//chai.use(`chai-datetime`);

const testPeeps = [
    {
        "username": "User1",
        "date": new Date(2021, 3, 17, 10, 33, 30, 0),
        "text": "test peep 1"
    },

    {
        "username": "Waqas",
        "date": new Date(2022, 3, 2, 12, 24, 30, 0),
        "text": "test peep"
    },
    {
        "username": "User2",
        "date": new Date(2021, 3, 17, 11, 33, 30, 0),
        "text": "test peep 2"
    }



]

describe("Server test relating to Peeps", () => {


    beforeEach(async () => {

        await Peep.deleteMany()
            .then(() => console.log(`peeps collections Database cleared`))
            .catch(error => {
                console.log(`Error clearing database, collection peeps`);
                throw new Error();
            });

        await Peep.insertMany(testPeeps)
            .then(() => console.log("Peeps inserted into the test Database"))
            .catch(error => {
                console.log(`Error inserting the peeps into the database`)
            })


    })



    it('should make a /GET request to get all peeps they should be chronologically ordered', async () => {

        const res = await chai.request(server)
            .get('/')
            .send()

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.eql(testPeeps.length);
        expect(res.body[0].username).to.equal(testPeeps[1].username)

    })


    describe('Post request tests for peeps', () => {

        it('should make a successful /POST request and send a success message  ', async () => {

            const postData = {
                username: 'Tester',
                date: new Date(Date.now()),
                text: "Test peep text"

            }

            const res = await chai.request(server)
                .post('/')
                .send(postData)

            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').eql('Peep sent!');



        })

        it('should send an error message if the post request sends incorrect text data ', async () => {

            const postData = {
                username: 'Tester',
                date: new Date(Date.now()),
                text: ""

            }

            const res = await chai.request(server)
                .post('/')
                .send(postData)


            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').eql('Peep could not be sent');


        })


        it('should send an error message if the post request sends non-existing username data ', async () => {

            //for some reason username can be a nonstring? need to brush up on express validator
            const postData = {
                date: new Date(Date.now()),
                text: "hello"

            }

            const res = await chai.request(server)
                .post('/')
                .send(postData)


            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').eql('Peep could not be sent');


        })

        it('should send an error message if the post request sends incorrect date data ', async () => {

            const postData = {
                username: "Tester",
                date: "Not a valid date",
                text: "hello"

            }

            const res = await chai.request(server)
                .post('/')
                .send(postData)


            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').eql('Peep could not be sent');


        })

    })





})