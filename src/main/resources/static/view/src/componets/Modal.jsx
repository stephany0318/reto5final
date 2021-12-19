import React from 'react';

const Modal = (props) => {
    let show = '';
    if (props.show) {
        show = "showmodal";
    } else {
        show = '';
    }

    return (
        <div className={"modal modalcontainer " + show}>
            <div className={"modal-form "+props.width}>
                <div className="g-12">
                    <div>
                        <h3>{props.title}</h3>
                    </div>
                    <div className="row g-3 modal-dialog-scrollable navbar-nav-scroll mt-2">
                        {props.container}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;