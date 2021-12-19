import React, {Fragment, useState, useRef} from 'react';

import {REGEX, doOpen} from '../js/manage';
import Footer from "../componets/Footer";
import UserService from '../services/UserService';
import Load from "../componets/Load";

const Login = (props) => {
    sessionStorage.clear();
    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Login ------------------------------------------------------
    const txtEmail = useRef();
    const txtPassword = useRef();

    const login = async () => {
        handleShow();
        let email = txtEmail.current.value;
        let password = txtPassword.current.value;

        if (email !== '' && password !== '') {
            if (REGEX.test(email)) {
                UserService.authenticate(email, password)
                    .then((response) => {
                        if (response.data.id !== null) {
                            sessionStorage.setItem("user", JSON.stringify(response.data));
                            doOpen("/profile")
                        } else {
                            alert('The email or password may be wrong')
                            handleClose();
                        }
                    }).catch(e => {
                    handleClose();
                    alert("Error in a connection");
                    console.log(e);
                });
            } else {
                handleClose();
                alert('Check the mail');
            }
        } else {
            handleClose();
            alert('Verify information');
        }
    }

    return (
        <Fragment>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="card-body">
                                            <form role="form">
                                                <label>Email</label>
                                                <div className="mb-3">
                                                    <input type="email" className="form-control" placeholder="Email"
                                                           aria-label="Email" aria-describedby="email-addon"
                                                           ref={txtEmail} required/>
                                                </div>
                                                <label>Password</label>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control"
                                                           placeholder="Password"
                                                           aria-label="Password" aria-describedby="password-addon"
                                                           ref={txtPassword} required/>
                                                </div>
                                                <div className="text-center">
                                                    <button type="button" onClick={login}
                                                            className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in
                                                    </button>
                                                </div>
                                                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                    <p className="mb-4 text-sm mx-auto mt-4">
                                                        Don't have an account?
                                                        <a href="/sign-up"
                                                           className="text-info text-gradient font-weight-bold mx-2">Sign
                                                            up</a>
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                        <div
                                            className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                                            style={{backgroundImage: "url(https://fondosmil.com/fondo/52686.jpg)"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer info={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}/>
            <Load show={show}/>
        </Fragment>
    );
}

export default Login;