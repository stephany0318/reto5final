import React, {Fragment} from 'react';
import ModalForm from "./ModalForm";
import FromData from "./FormData";

const Table = (props) => {
    let add = [];

    if (props.add.status) {
        add.push(<ModalForm title={props.add.name}
                            width={props.add.form.width}
                            container={<FromData buttonName={props.add.form.buttonName}
                                                 event={props.add.form.event}
                                                 items={props.add.form.data}
                                                 data={null}
                                                 clear={props.add.form.clear}/>}
        />)
    }

    if (props.addTable.status) {
        add.push(<ModalForm title={props.addTable.name}
                            width={props.addTable.table.width}
                            container={props.addTable.table.table}
        />)
    }

    function onEvent(item) {
        let event = [];

        if (props.event.indexOf('select') !== -1) {
            event.push(props.select.event && (<select className="btn btn-simple m-2"
                                                      id={"select" + item.reference}
                                                      onClick={ev => props.select.event(item)}>
                {props.select.options(item)}</select>)
            )
        }

        if (props.event.indexOf('aux') !== -1) {
            event.push(props.auxEvent && (
                <button onClick={ev => props.auxEvent(item)}
                        className={"btn btn-simple m-2 " + props.aux.color}>{props.aux.name}</button>
            ))
        }

        if (props.event.indexOf('update') !== -1) {
            event.push(<ModalForm title={props.update.name}
                                  width={props.update.form.width}
                                  container={<FromData buttonName={props.update.form.buttonName}
                                                       event={props.update.form.event}
                                                       items={props.update.form.data}
                                                       data={item}
                                                       typeId={props.update.form.typeId}
                                                       clear={props.update.form.clear}/>}
                                  event={props.update.event}
                                  color={props.update.color}/>)
        }

        if (props.event.indexOf('remove') !== -1) {
            event.push(props.remove.event && (
                <button onClick={ev => props.remove.event(item)}
                        className="btn btn-simple m-2 text-color-red">Eliminar</button>
            ))
        }

        if (props.event.indexOf('detail') !== -1) {
            event.push(<ModalForm title={props.detail.name}
                                  with={props.detail.width}
                                  color={props.detail.color}
                                  container={[props.detail.event(item)]}/>)
        }

        return event
    }

    return (
        <Fragment>
            <div className="container">
                <div className="col-12">
                    <div className="content mb-4">
                        <div className="card-header pb-0">
                            <h6>{props.name}</h6>
                        </div>
                        <div>
                            {add}
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        {props.columns.map((col, index) => (
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                key={index} scope="col">{col.column}</th>
                                        ))}

                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                            scope="col">#
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        props.data.length > 0 && props.data.map((item, index) => (
                                            <tr key={index}>
                                                {props.columns.map((col, index) => (
                                                    <td key={index}>{item[col.value]}</td>
                                                ))}
                                                <td>
                                                    {onEvent(item)}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Table;