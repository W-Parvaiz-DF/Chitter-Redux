import axios from 'axios';
import { useState, useEffect } from 'react';
import Peeps from './Peeps';
import './Home.css'

const Home = () => {

    const [peeps, setPeeps] = useState([]);
    const [err, setErr] = useState([null]);

    const getPeeps = async () => {
        try {
            const res = await axios.get('http://localhost:4000');
            console.log(res.data)
            setPeeps(res.data);
            console.log(peeps)
        }
        catch (err) {
            console.log(err);
            setErr(err);

        }
    }

    useEffect(() => {

        getPeeps();

    }, [])


    const peepsComponents = peeps.map(peep => {
        return <Peeps peep={peep} key={peep._id} />
    })


    return (
        <>
            <div className="chatPage text-center bg-primary col-4 col-sm-6 col-md-8 col-lg-12">
                <h1 className="text-white" >Hey, User! Ready to chat? </h1>

                {peepsComponents}

                <form >
                    <div className="form-group comment-form ">
                        <textarea className="form-control border border-danger rounded border-4 " id="chitterBox" placeholder="Post something to the World!" rows="5"></textarea>
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </div>

                </form>

            </div>

        </>




    )
}

export default Home

