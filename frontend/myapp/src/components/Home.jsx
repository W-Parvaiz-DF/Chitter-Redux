import axios from 'axios';
import { useState, useEffect } from 'react';
import Peeps from './Peeps';
import './Home.css'
import PeepsNotFound from './PeepsNotFound';

const Home = () => {

    const [peeps, setPeeps] = useState([]);
    const [err, setErr] = useState(null);

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
            <div className="chatPage text-center bg-primary col-4 col-sm-6 col-md-8 col-lg-12" key="HomepageDive">
                <h1 className="text-white" >Hey, Guest! Ready to chat? </h1>



                {err?.response.status && <h3>There was a {`${err.response.status}`} error: {`${err.response.statusText}`}</h3>}
                {/*For when there isn't a network error but there is no data*/}

                {!err?.response.status && err?.message && <PeepsNotFound message={err.message} />}
                {/* ^This is for a network error  */}

                {peeps.length > 0 && peepsComponents}

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

