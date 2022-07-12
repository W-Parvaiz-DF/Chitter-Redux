import React from 'react'
import './PostedModal.css';




const PostedModal = ({ message, handleClose }) => {


    const showHideClassName = message ? `modal display-block` : `modal display-none`;

    return (
        <>
            <div className={showHideClassName}>
                <section className="modal-main">
                    <h3>Peep Status</h3>
                    <p>{message}</p>
                    <button className="btn btn-primary" onClick={handleClose}>Close</button>
                </section>
            </div>

            {/* <div className="modal" id="PostedModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Peep Status</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>

                    </div>
                </div>
            </div> */}

        </>
    )
}



export default PostedModal