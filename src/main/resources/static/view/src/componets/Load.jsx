import React, {Fragment} from 'react';

const Load = (props) => {
    let show = '';
    if (props.show) {
        show = "showmodal";
    } else {
        show = '';
    }
    return (
        <Fragment>
            <div className={"modal modalcontainer " + show}>
                <div className="g-12">
                    <div className="spinner-border m-5">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Load;