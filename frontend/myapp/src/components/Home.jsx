import axios from 'axios';
import { useState, useEffect } from 'react';
import Peeps from './Peeps';
import './Home.css'
import PeepsNotFound from './PeepsNotFound';
import PeepModel from '../utils/PeepModel';
import PostedModal from './PostedModal';

import authHeader from '../services/auth-header';



const Home = ({ currentUser }) => {

    console.log(currentUser)

    const username = currentUser?.username ? currentUser.username : 'Guest' //should work

    console.log(`Home.jsx line 17 username: ${username}`)

    const [newText, setNewText] = useState('');
    const [postedStatus, setPostedStatus] = useState(false)

    //const [modalState, setModalState] = useState(false)
    const [message, setMessage] = useState("");
    const [peeps, setPeeps] = useState([]);
    const [err, setErr] = useState(null);

    const getPeeps = async () => {

        try {
            const res = await axios.get('http://localhost:4000/user', { headers: authHeader() });
            setPeeps(res?.data);
            //console.log(peeps)
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

        const postPeep = new PeepModel(username, new Date(Date.now()), newText);
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

                <div className='container vertical-scrollable'>
                    <div className='row text-center'>
                        {!peeps && !err && <h3>Loading Peeps...</h3>}

                        {err?.response?.statusText && <h3>There was a {`${err.response.status}`} error: {`${err.response.statusText}`}</h3>}
                        {/*For when there isn't a network error but there is no data*/}

                        {err?.message && !err?.response?.status && <PeepsNotFound message={err.message} />}

                        {/* ^This is for a network error  */}

                        {peeps?.length > 0 && peepsComponents}
                    </div>
                </div>
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

