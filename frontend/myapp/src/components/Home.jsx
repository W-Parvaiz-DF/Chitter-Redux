

const Home = () => {
    return (
        <>
            <div className="chatPage row text-center bg-primary m-2">
                <h1 className="text-white" >Hey, User! Ready to chat? </h1>



                <form >
                    <div className="form-group comment-form mb-2 col-lg">
                        <textarea className="form-control mb-2" id="chitterBox" placeholder="Post something to the World!" rows="5"></textarea>
                        <button type="submit mb-2" className="btn btn-danger">Submit</button>
                    </div>

                </form>



            </div>


        </>




    )
}

export default Home