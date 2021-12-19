import React, {Fragment} from 'react';
import Box from "./Box";


const Footer = (props) => {
    const boxs = () => {
        let list = [];
        for (let box of props.info.boxs) {
            list.push(<Box name={box.name} url={box.url} target="_target" icon={box.icon} status={box.status}/>)
        }
        return list;
    }
    return (
        <Fragment>
            <footer className="footer pt-3">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © {props.info.name}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                {boxs()}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer;