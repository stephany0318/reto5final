import React, {Fragment} from 'react';

const FormData = (props) => {

    let list = [];

    for (let input of props.items) {

        let id = input.name;

        if (input.type !== "select") {
            let val = null;

            if (props.data !== null) {
                val = props.data[input.name];
                id = (input.name + props.data[props.typeId]);
            }

            list.push(
                <div className={"col-md-" + input.size}>
                    <label>{input.title} <strong>{"(" + input.status + ")"}</strong></label>
                    <input id={id} className="form-control" type={input.type}
                            defaultValue={val}/>
                </div>
            );

        } else {
            let op = [];
            for (let option of input.option) {
                let val = <option value={option.value}>{option.name}</option>;
                if (props.data !== null) {
                    id = (input.name + props.data[props.typeId]);
                    if (option.value === props.data[input.name]) {
                        val = <option value={option.value} selected>{option.name}</option>
                    }
                }
                op.push(val)
            }

            list.push(
                <div className={"col-md-" + input.size}>
                    <label>{input.title}</label>
                    <select id={id} className="form-control">
                        {op}
                    </select>
                </div>
            );
        }
    }

    let data = () => {
        let dt = [];
        for (let info of props.items) {
            let id = info.name;

            if (props.data !== null) {
                id = info.name + props.data[props.typeId]
            }

            dt.push({name: info.name, value: document.getElementById(id).value})
        }

        if (props.clear) {
            props.event(dt);

            for (let input of props.items) {
                if (input.type !== "select")
                    document.getElementById(input.name).value = '';
            }
        } else {
            props.event(dt, props.data)
        }
    }

    list.push(<div className="col-12">
        <button className="btn btn-primary col-md-5" onClick={(data)}>{props.buttonName}</button>
    </div>)

    return (
        <Fragment>
            {list}
        </Fragment>
    );
}

export default FormData;