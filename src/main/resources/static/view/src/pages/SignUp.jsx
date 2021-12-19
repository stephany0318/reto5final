import React, {Fragment, useState} from 'react';
import ProfileFormData from "../componets/ProfileFormData";
import {doOpen, USER} from '../js/manage';
import Load from "../componets/Load";
import Footer from "../componets/Footer";
import UserService from "../services/UserService";

const SignUp = (props) => {

    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onRegisterUser = () => {
        let txtName = document.getElementById('name').value;
        let txtIdentification = document.getElementById('identification').value;
        let txtCellPhone = document.getElementById('cellPhone').value;
        let txtEmail = document.getElementById('email').value;
        let txtPassword = document.getElementById('password').value;

        if (txtName !== ''
            && txtIdentification !== ''
            && txtCellPhone !== ''
            && txtEmail !== ''
            && txtPassword !== '') {
            handleShow();
            let json = {
                name: txtName,
                identification: txtIdentification,
                cellPhone: txtCellPhone,
                email: txtEmail,
                password: txtPassword,
                type: "CLIENT"
            };

            UserService.existsEmail(json.email)
                .then((response) => {
                    if (!response.data) {
                        UserService.save(json)
                            .then((response) => {
                                UserService.existsEmail(json.email)
                                    .then((response) => {
                                        if (response.data) {
                                            handleClose();
                                            alert('Save user');
                                            doOpen("/");
                                        } else {
                                            handleClose();
                                            alert('Could not save data');
                                        }
                                    }).catch(e => {
                                    handleClose();
                                    alert("Process error");
                                    console.log(e);
                                });
                            }).catch(e => {
                            handleClose();
                            alert("Process error");
                            console.log(e);
                        });
                    } else {
                        alert("The email is already registered, try another");
                        handleClose();
                    }
                })
        } else {
            alert("Incomplete form");
        }
    }


    return (
        <Fragment>
            <section className="min-vh-100 mb-8">
                <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
                     style={{backgroundImage: "url(assets/img/curved-images/curved14.jpg)"}}>
                    <span className="mask bg-gradient-dark opacity-6"></span>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 text-center mx-auto">
                                <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10">
                        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0">
                                <div className="card-header text-center pt-4">
                                    <h5>Register with</h5>
                                </div>
                                <div className="card-body">
                                    <form role="form text-left">
                                        <div className="mb-3">
                                            <input id="name" type="text" className="form-control" placeholder="Name"
                                                   aria-label="Name" aria-describedby="email-addon"/>
                                        </div>
                                        <div className="mb-3">
                                            <input id="identification" type="number" className="form-control"
                                                   placeholder="Identification"
                                                   aria-label="Name" aria-describedby="email-addon"/>
                                        </div>
                                        <div className="mb-3">
                                            <input id="cellPhone" type="number" className="form-control"
                                                   placeholder="CellPhone"
                                                   aria-label="Name" aria-describedby="email-addon"/>
                                        </div>
                                        <div className="mb-3">
                                            <input id="email" type="email" className="form-control" placeholder="Email"
                                                   aria-label="Email" aria-describedby="email-addon"/>
                                        </div>
                                        <div className="mb-3">
                                            <input id="password" type="password" className="form-control"
                                                   placeholder="Password"
                                                   aria-label="Password" aria-describedby="password-addon"/>
                                        </div>

                                        <div className="text-center">
                                            <button type="button" onClick={onRegisterUser}
                                                    className="btn bg-gradient-dark w-100 my-4 mb-2">Sign
                                                up
                                            </button>
                                        </div>
                                        <p className="text-sm mt-3 mb-0">Already have an account? <a href="/"
                                                                                                     className="text-dark font-weight-bolder">Sign
                                            in</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer info={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}/>
            <Load show={show}/>
        </Fragment>
    );
}

export default SignUp;