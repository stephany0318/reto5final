import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER, date} from '../js/manage';
import {
    columnsOrderCoord,
    columnsOrderProduct
} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import OrderService from "../services/OrderService";
import Load from "../componets/Load";

const Coord = (props) => {

    if (USER === null) {
        doOpen('/');
    }

    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Order -------------------------------------------------------
    const [orderList, setOrderList] = useState([]);

    const tableDataOreder = () => {
        OrderService.getAll()
            .then((response) => {
                let orders = [];
                for (let order of response.data) {
                    orders.push(
                        {
                            salesMan_identification: order.salesMan.identification,
                            salesMan_name: order.salesMan.name,
                            salesMan_email: order.salesMan.email,
                            registerDay: order.registerDay,
                            id: order.id,
                            products: order.products,
                            status: order.status,
                            quantities: order.quantities
                        })
                }
                setOrderList(orders);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataOreder();
    }, [])

    const getOrderAllProducts = (order) => {
        handleShow();
        let list = [];
        let count = order.quantities;
        for (let product in order.products) {
            let dis = '';
            let countI = 0;

            if (order.products[product].availability) {
                dis = 'Si';
            } else {
                dis = 'No';
            }

            for (let i in count) {
                if (i === order.products[product].reference)
                    countI = count[i]
            }

            list.push({
                reference: order.products[product].reference,
                category: order.products[product].category,
                description: order.products[product].description,
                availability: dis,
                price: order.products[product].price,
                quantity: countI
            });
        }

        handleClose();

        return <Table name={"Products: " + list.length}
                      data={list}
                      columns={columnsOrderProduct}
                      event={[]}

                      add={{
                          status: false,
                      }}

                      addTable={{
                          status: false,
                      }}/>;
    }

    const statusDate = (object) => {
        handleShow();
        object.status = document.getElementById("select" + object.reference).value;
        OrderService.update(object)
            .then((response) => {

            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });

    }

    const statusSelect = (data) => {
        let option = [];
        if (data.status === "Aprobada") {
            option.push(<option value="Aprobada" selected>Aprobada</option>);
            option.push(<option value="Pendiente">Pendiente</option>);
        } else {
            option.push(<option value="Aprobada">Aprobada</option>);
            option.push(<option value="Pendiente" selected>Pendiente</option>);
        }
        return option
    }

    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "table", url: "/coord", icon: "table", status: "shadow"}, {
                           name: "Products",
                           url: "/products",
                           icon: "store-alt",
                           status: ""
                       },
                           {name: "Birthday", url: "/birthday", icon: "birthday-cake", status: ""}]}
                       container={[
                           <Table name={<h5 className={"m-2"}>Order: {orderList.length}</h5>}
                                  data={orderList} columns={columnsOrderCoord}
                                  event={["detail", "select"]}

                                  add={{
                                      status: false,
                                  }}

                                  addTable={{
                                      status: false,
                                  }}

                                  select={{
                                      options: statusSelect,
                                      event: statusDate
                                  }}

                                  detail={{
                                      name: "Order",
                                      width: "width-1000",
                                      event: getOrderAllProducts,
                                      color: "text-color-blue",
                                      columns: {columnsOrderProduct}
                                  }}
                           />]}/>
            <Load show={show}/>
        </Fragment>
    );
}

export default Coord;