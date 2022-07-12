import logo from '../../images/chitterlogo.jpg'
import './Login.css'
import React, { useState, useRef, useEffect } from 'react';

import AuthService from '../../services/auth.service';

import { useNavigate } from 'react-router-dom';


//import ValidationServiceHelpers from '../../services/validation.serviceHelpers'; -had to remove since react-validator isn't working


//import Form from '';

// import { Form } from 'react-validation';#
// import { Form }  from 'react-validation';
// import { Input } from "react-validation";
// import { CheckButton } from "react-validation";

//the above doesn't work, react-validator is several-years old and not recommended



const Login = ({ setCurrentUser }) => {


    useEffect(() => {
        localStorage.clear()
        setCurrentUser(null)
    }, [])


    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(``);

    let navigate = useNavigate();


    const onChangeEmail = e => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const onChangePassword = e => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    const handleLogin = async e => {
        e.preventDefault();

        setMessage(``);
        setLoading(true);

        //form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
        const login = await AuthService.login(email, password);
        if (localStorage.getItem("user")) {
            navigate(`/home`);
            window.location.reload();
        }
        else {
            console.dir(login);
            setMessage(login.error);
            setLoading(false);
        }
        // }
        // else {
        //     setLoading(false);
        // }
    }

    return (
        <><meta name="viewport" content="width=device-width,  initial-scale=1.0"></meta>
            <div className=" text-center loginFull">
                <div className="col-5 loginLeft">
                    <h1> Welcome to Chitter!</h1>
                    <img alt="Chitter logo" src={logo} className="logo"></img>
                </div>



                <div className="col-5 loginRight">
                    <div className='loginRightContent'>


                        <h1>Login</h1>


                        <form onSubmit={handleLogin} ref={form}>
                            <div className="form-group login-form">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={onChangeEmail}
                                    // validations={[ValidationServiceHelpers.required]}
                                    name="email"
                                    required
                                />
                            </div >

                            <div>&nbsp;</div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    // validations={[ValidationServiceHelpers.required]}
                                    className="form-control"
                                    name="password"
                                    required
                                />
                            </div>

                            <div>&nbsp;</div>

                            <div className="form-group">
                                <button
                                    className="btn btn-success btn-block"
                                    disabled={loading}
                                    type="submit"
                                    ref={checkBtn}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Let's Chit</span>
                                </button>
                            </div>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}

                            {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}


                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login