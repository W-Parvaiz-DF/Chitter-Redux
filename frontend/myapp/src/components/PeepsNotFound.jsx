import React from 'react'
import PropTypes from 'prop-types'


const PeepsNotFound = ({ message }) => {

    console.log(message)
    return (
        <>
            <div className='card mb-2'>

                <div className="card-body border border-warning border-4">

                    <h3 className="card-text">There was a {message}</h3>

                </div>

            </div>


        </>
    )
}

//PeepsNotFound.propTypes = {}

export default PeepsNotFound