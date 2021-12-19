import React, {Fragment, useState} from 'react';
import Modal from "./Modal";

const ModalForm = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <button className={"btn btn-simple m-2 " + props.color} onClick={handleShow}>{props.title}</button>

            <Modal show={show} title={props.title} width={props.width} container={[props.container,
                <div className="col-12">
                    <button className="btn btn-outline-primary col-md-4 " onClick={handleClose}>Close</button>
                </div>]}/>
        </Fragment>
    )
}

export default ModalForm;