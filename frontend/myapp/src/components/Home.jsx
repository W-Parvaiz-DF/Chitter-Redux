import axios from 'axios';
import { useState, useEffect } from 'react';
import Peeps from './Peeps';
import './Home.css'
import PeepsNotFound from './PeepsNotFound';
import PeepModel from '../utils/PeepModel';
import PostedModal from './PostedModal';

const Home = () => {

    const user = "CurrentUser" //just a placeholder until we get a login system


    const [newText, setNewText] = useState('');
    const [postedStatus, setPostedStatus] = useState(false)

    //const [modalState, setModalState] = useState(false)
    const [message, setMessage] = useState("");
    const [peeps, setPeeps] = useState([]);
    const [err, setErr] = useState(null);

    const getPeeps = async () => {

        try {
            const res = await axios.get('http://localhost:4000');
            setPeeps(res?.data);
            console.log(peeps)
        }
        catch (err) {
            console.log(err);
            setErr(err);

        }
    }


    useEffect(() => {


        getPeeps();

    }, [postedStatus])


    const handleChange = e => {

        setNewText(e.target.value)
        setPostedStatus(false)

    }


    const postPeep = async e => {

        e.preventDefault();

        const postPeep = new PeepModel(user, new Date(Date.now()), newText);
        const res = await axios.post(`http://localhost:4000`, postPeep);

        setMessage(res.data.message);
        // alert(res.data.message); 
        setPostedStatus(true);
        setNewText('')

    }


    let peepsComponents;

    if (peeps?.length > 0) {

        peepsComponents = peeps.map(peep => {
            return <Peeps peep={peep} key={peep._id} />
        })
    }


    return (
        <>
            <div className="chatPage text-center bg-primary col-4 col-sm-6 col-md-8 col-lg-12" key="HomepageDive">
                <h1 className="text-white" >Hey, Guest! Ready to chat? </h1>

                {!peeps && !err && <h3>Loading Peeps...</h3>}

                {err?.response?.statusText && <h3>There was a {`${err.response.status}`} error: {`${err.response.statusText}`}</h3>}
                {/*For when there isn't a network error but there is no data*/}

                {err?.message && !err?.response?.status && <PeepsNotFound message={err.message} />}

                {/* ^This is for a network error  */}
                {peeps?.length > 0 && peepsComponents}

                <form onSubmit={postPeep}>
                    <div className="form-group comment-form ">

                        <textarea className="form-control border border-danger rounded border-4 "
                            id="chitterBox" placeholder="Post something to the World!" rows="5"
                            required onChange={handleChange} value={newText}></textarea>

                        <button type="submit" className="btn btn-danger" id="postBtn">Submit</button>



                    </div>

                </form>

                {postedStatus && <PostedModal message={message} handleClose={() => setMessage('')} />}



            </div>
        </>
    )
}

export default Home

