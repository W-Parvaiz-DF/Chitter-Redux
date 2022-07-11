import logo from '../../images/chitterlogo.jpg'
import './Login.css'
import React, { useState, useRef } from 'react';

import AuthService from '../../services/auth.service';
import ValidationServiceHelpers from '../../services/validation.serviceHelpers';
import { useNavigate } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// might need to add this somewhere col-4 col-sm-6 col-md-8 col-lg-12

const Login = () => {

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

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            const login = await AuthService.login(email, password);
            if (localStorage.getItem("user")) {
                navigate(`/home`);
                // window.location.reload();
            }
            else {
                console.dir(login);
                setMessage(login.error);
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
    }

    return (
        <><meta name="viewport" content="width=device-width,  initial-scale=1.0"></meta>
            <div className=" text-center loginFull">
                <div className="col-5">
                    <h1> Welcome to Chitter!</h1>
                    <img alt="Chitter logo" src={logo} className="logo"></img>
                </div>



                <div className="col-5 loginRight">
                    <div className='loginRightContent'>


                        <h1>Login</h1>


                        <Form onSubmit={handleLogin} ref={form}>
                            <div className="form-group login-form">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[ValidationServiceHelpers.required]}
                                    name="email" />
                            </div >

                            <div>&nbsp;</div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[ValidationServiceHelpers.required]}
                                    className="form-control"
                                    name="password" />
                            </div>

                            <div>&nbsp;</div>

                            <div className="form-group">
                                <button
                                    className="btn btn-success btn-block"
                                    disabled={loading}
                                    type="submit">
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
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />


                        </Form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login