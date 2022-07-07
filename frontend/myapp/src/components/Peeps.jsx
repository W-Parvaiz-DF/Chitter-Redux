import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';


const Peeps = ({ peep }) => {

    const { username, date, text } = peep;
    const formattedDate = moment(date).format('hh:mm a (MM/DD/YYYY) ');


    return (
        <>
            <div className='card mb-2 container col-sm-8'> {/* col-10 col-sm-6 col-md-8 col-lg-12*/}

                <div className="card-body border border-success border-4">
                    <h5 className="card-title ">{username}</h5>
                    <p className="card-subtitle mb-2 mt-0 text-muted">{formattedDate}</p>
                    <h6 className="card-text">{text}</h6>

                </div>


                {/* <h2> {username} at {date} said {text} </h2> */}
            </div >
        </>
    )
}


// Peeps.propTypes = {}

export default Peeps