import React, {Fragment} from 'react';

const ProfileFormData = (props) => {
    return (
        <Fragment>
            <div className="card card-body mx-3 mx-md-4 mt-n6 align-items-center">
                <div className="row gx-4 mb-2">
                    <div className="col-auto my-auto">
                        <div className="h-100 align-items-center text-center">
                            <h5 className="mb-1">{props.name}</h5>
                            <p className="mb-0 font-weight-normal text-sm">{props.type}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="card-body p-3">
                            <ul className="list-group">
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Email: </strong> &nbsp; <label>{props.email}</label>
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Zone: </strong> &nbsp; <label>{props.zone}</label>
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                    <strong className="text-dark">Identification: </strong> &nbsp; <label>{props.identification}</label>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileFormData;