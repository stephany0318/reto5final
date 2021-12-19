import React, {Fragment} from 'react';
import Box from "./Box";

const Nav = (props) => {
    const boxs = () => {
        let list = [];
        for (let box of props.boxs) {
            list.push(<Box name={box.name} url={box.url} icon={box.icon} status={box.status}/>)
        }
        return list;
    }
    return (
        <Fragment>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow border-radius-xl"
                 navbar-scroll="true">
                <div className="container-fluid py-2 px-3">
                    <nav aria-label="breadcrumb">
                        <h4 className="font-weight-bolder mb-0">{props.title}</h4>
                    </nav>
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 d-flex">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            {boxs()}
                            <Box name={"exit"} url={"/"} icon={"sign-out"} status={""}/>
                        </div>
                        <h6>{props.profile_name}</h6>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Nav;