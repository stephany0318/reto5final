import React, {Fragment, useState, useRef} from 'react';

import Nav from "./Nav";
import Footer from "./Footer";

const Container = (props) => {
    return (
        <Fragment>
            <body className="container-fluid my-4">
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <Nav title={props.title} profile_name={props.profile_name}
                     boxs={props.nav}/>
                <div className="container-fluid py-4">
                    {props.container}
                    <Footer info={props.footer}/>
                </div>
            </main>
            </body>
        </Fragment>
    )
}

export default Container;