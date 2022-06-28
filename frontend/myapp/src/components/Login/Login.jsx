import logo from '../../images/chitterlogo.jpg'
import './Login.css'

const Login = () => {
    return (
        <><meta name="viewport" content="width=device-width,  initial-scale=1.0"></meta>
            <div className="row text-center loginFull">
                <div className="col-5">
                    <h1> Welcome to Chitter!</h1>
                    <img alt="Chitter logo" src={logo} className="logo"></img>
                </div>
                <div className="col-5 loginRight">
                    <div className='loginRightContent'>
                        <h1>Login</h1>
                        <form>
                            <div className="form-group login-form">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email" /></div >

                            <div>&nbsp;</div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password" />
                            </div>

                            <div>&nbsp;</div>

                            <div className="form-group">
                                <button
                                    className="btn btn-success btn-block"
                                    type="submit">
                                    Let's Chit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login