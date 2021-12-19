import React, {Fragment, useState} from 'react';
import ProfileFormData from "../componets/ProfileFormData";
import {doOpen, USER} from '../js/manage';
import Load from "../componets/Load";

const Profile = (props) => {
    if (USER === null) {
        doOpen('/');
    }
    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const login = () => {
        handleShow();
        doOpen('/');
    }

    const sessionUser = () => {
        handleShow();
        switch (USER.type) {
            case 'ADMIN':
                doOpen('/admin');
                break;
            case 'ASE':
                doOpen('/ase');
                break;
            case 'COORD':
                doOpen('/coord');
                break;
            case 'CLIENT':
                doOpen('/products');
                break;
        }
    }

    return (
        <Fragment>
            <main className="main-content  mt-0">
                <div className="page-header align-items-start min-vh-100"
                     style={{backgroundImage: "url(https://www.10wallpaper.com/wallpaper/1366x768/1711/Office_Desk_Keyboard_Art_Cup_Photo_HD_Wallpaper_1366x768.jpg)"}}>
                    <span className="mask bg-gradient-dark opacity-6"/>
                    <div className="container my-auto">
                        <div className="row" id="login">
                            <div className="container-fluid px-2 px-md-4 max-width-500 card">
                                <div className="text-center mt-2"><h2>User</h2></div>
                                <div className="page-header min-height-200 border-radius-xl mt-2"
                                     style={{backgroundImage: "url(assets/img/curved-images/curved14.jpg)"}}>
                                </div>
                                <ProfileFormData name={USER.name} email={USER.email} zone={USER.zone} type={USER.type}
                                                 identification={USER.identification}/>
                                <div className=" mt-3 mb-3 flex-row align-items-center m-auto">
                                    <button className="btn bg-gradient-info m-2" onClick={sessionUser}>Get into</button>
                                    <button className="btn btn-light-rounded m-2" onClick={login}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Load show={show}/>
        </Fragment>
    );
}

export default Profile;