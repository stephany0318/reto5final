import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER, date} from '../js/manage';
import {
    columnsOrder,
    columnsOrderProduct,
    columnsProduct,
    columnsProductOrder,
    formCount, columnsOrderAse
} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import OrderService from "../services/OrderService";
import ProductService from "../services/ProductService";
import Load from "../componets/Load";

const Ase = (props) => {

    if (USER === null) {
        doOpen('/');
    }

    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Order -------------------------------------------------------
    const [orderListUser, setOrderListUser] = useState([]);
    const [inputFilter, setInputFilter] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const tableDataOrederUser = (event) => {
        event.then((response) => {
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
            setOrderListUser(orders);
        }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataOrederUser(OrderService.getAllUser(USER.id));
    }, []);

    function methodFilter(type) {
        let value = document.getElementById("txtFilter").value;
        switch (type) {
            case 'fecha':
                tableDataOrederUser(OrderService.allFilterDate(value, USER.id));
                break;
            case 'estado':
                tableDataOrederUser(OrderService.allFilterStatus(value, USER.id));
                break;
        }
    }

    function inputDate() {
        return [<input id="txtFilter" type="date" className="form-control mt-4 col-md-8 mb-2 text-center"/>,
            <div className="card-body mx-auto col-md-6">
                <button className="btn bg-gradient-primary col-md-12"
                        onClick={e => methodFilter("fecha")}>Ok
                </button>
            </div>];
    }

    function inputSetct() {
        return <select id="txtFilter" className="form-control mt-4 col-md-8 text-center"
                       onClick={e => methodFilter("estado")}>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobada">Aprobada</option>
        </select>;
    }

    const inputTypeValue = () => {
        let value = document.getElementById('selectFilterData').value;
        switch (value) {
            case 'fecha':
                setInputFilter(inputDate);
                break;
            case 'estado':
                setInputFilter(inputSetct);
                break;
            case 'todo':
                tableDataOrederUser(OrderService.getAllUser(USER.id));
                setInputFilter([]);
                break;
        }
    }

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

    const [productOrdelList, setOrderproductList] = useState([]);
    const [orderListProduct, setOrderListProduct] = useState([]);


    const tableDataProduct = () => {
        ProductService.getAll()
            .then((response) => {
                for (let product of response.data) {
                    product["count_order"] = 1;
                    if (product.availability) {
                        product["availability_table"] = "Si";
                    } else {
                        product["availability_table"] = "No";
                    }
                    response.data[product] = product;
                }

                setOrderproductList(response.data);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataProduct();
    }, [])


    const removeListAndAdd = (object) => {
        let list = orderListProduct;
        let subList = productOrdelList;
        list.push(object);
        subList.splice(object, 1);
        allProduct(subList);
        allProductOrder(list);
    }

    const addListAndRemove = (object) => {
        let list = orderListProduct;
        let subList = productOrdelList;
        subList.push(object);
        list.splice(object, 1);
        allProduct(subList);
        allProductOrder(list);
    }

    function allProduct(list) {
        let subList = [];
        for (let product of list) {
            subList.push(product);
        }
        setOrderproductList(subList);
    }

    function allProductOrder(list) {
        let subList = [];
        for (let product of list) {
            subList.push(product);
        }
        setOrderListProduct(subList);
    }

    const countProduct = (input, data) => {
        let list = orderListProduct;
        data["count_order"] = 1;
        list[list.indexOf(data)].count_order = input[0].value;
        allProductOrder(list);
        alert('Updated quantity');
    }

    const onRegisterOrder = () => {
        try {
            if (orderListProduct.length === 0) {
                alert("First you have to enter the products");
                return;
            }

            let json = {};

            json["registerDay"] = date();
            json["status"] = "Pendiente";
            json["salesMan"] = USER;

            let products = {};
            let quantities = {};

            for (let val of orderListProduct) {
                products[val.reference] = {
                    reference: val.reference,
                    category: val.category,
                    description: val.description,
                    availability: val.availability,
                    price: val.price,
                    quantity: val.quantity,
                    photography: val.photography
                }

                quantities[val.reference] = val.count_order;
            }

            json["products"] = products;
            json["quantities"] = quantities;

            OrderService.save(json)
                .then((response) => {
                    setOrderListProduct([]);
                    tableDataProduct();
                    tableDataOrederUser(OrderService.getAllUser(USER.id));
                    tableDataOreder();
                    handleClose();
                    alert('Save Order');
                }).catch(e => {
                handleClose();
                alert("Process error");
                console.log(e);
            });
        } catch (e) {
            handleClose();
            console.log(e);
            alert("Process error");
        }
    }

    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "Orders", url: "/ase", icon: "table", status: "shadow"},
                           {name: "Products", url: "/products", icon: "store-alt", status: ""},
                           {name: "Birthday", url: "/Birthday", icon: "birthday-cake\n", status: ""}]}
                       container={[<div className="container-fluid py-4">
                           <div className="row mt-2">
                               <div className="col-lg-4">
                                   <div className="card h-100">
                                       <div className="card-body">
                                           <h3 className="font-weight-bolder">Invoice information</h3>
                                           <div className="row">
                                               <div className="col-12 mt-4">
                                                   <div className="col-6 col-sm-12">
                                                       <label>Date</label>
                                                       <h4>{date()}</h4>
                                                   </div>
                                                   <div className="col-6 col-sm-12">
                                                       <label>Status</label>
                                                       <h4>Pendiente</h4>
                                                   </div>
                                                   <div className="col-6 col-sm-12">
                                                       <label>SalesMan</label>
                                                       <h4>{USER.name}</h4>
                                                   </div>
                                                   <div className="card-body">
                                                       <button type="button"
                                                               className="btn bg-gradient-primary col-md-12"
                                                               data-bs-toggle="modal"
                                                               onClick={onRegisterOrder}>
                                                           Register Order
                                                       </button>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-lg-8 mt-lg-0 mt-2">
                                   <Table name={<h5 className={"m-2"}>Product order: {orderListProduct.length}</h5>}
                                          data={orderListProduct} columns={columnsProductOrder}
                                          event={["update", "remove"]}

                                          add={{
                                              status: false,
                                          }}

                                          auxEvent={removeListAndAdd}

                                          update={{
                                              name: "Count",
                                              color: "text-color-yellow",
                                              form: {
                                                  buttonName: "Ok",
                                                  width: "width-600",
                                                  event: countProduct,
                                                  data: formCount,
                                                  clear: false,
                                                  typeId: "reference"
                                              }
                                          }}

                                          remove={{
                                              name: "Remove",
                                              color: "text-color-red",
                                              event: addListAndRemove
                                          }}

                                          addTable={{
                                              name: "Add product",
                                              status: true,
                                              table: {
                                                  width: "width-1200",
                                                  table: <Table name={"Products: " + productOrdelList.length}
                                                                data={productOrdelList}
                                                                columns={columnsProduct}
                                                                event={["aux"]}

                                                                add={{
                                                                    status: false,
                                                                }}

                                                                addTable={{
                                                                    status: false,
                                                                }}

                                                                auxEvent={removeListAndAdd}

                                                                aux={{
                                                                    name: "Add",
                                                                    color: "text-color-yellow"
                                                                }}
                                                  />
                                              }
                                          }}
                                   />
                               </div>
                           </div>
                       </div>,
                           <div className="mx-auto">
                               <h2 className="mb-3 text-center">Filter</h2>
                               <div className="container content mb-4 col-lg-8 p-3">
                                   <select className="form-select text-center" id={"selectFilterData"}
                                           onClick={inputTypeValue}>
                                       <option value="todo">All</option>
                                       <option value="fecha">Date</option>
                                       <option value="estado">Status</option>
                                   </select>
                                   {inputFilter}
                               </div>
                               <Table name={<h5 className="m-2">Order: {orderListUser.length}</h5>}
                                      data={orderListUser} columns={columnsOrder}
                                      event={["detail"]}

                                      add={{
                                          status: false,
                                      }}


                                      addTable={{
                                          status: false,
                                      }}

                                      detail={{
                                          name: "Order",
                                          width: "width-1000",
                                          event: getOrderAllProducts,
                                          color: "text-color-blue",
                                          columns: {columnsOrderProduct}
                                      }}
                               /></div>, <Table name={<h5 className={"m-2"}>Order: {orderList.length}</h5>}
                                                data={orderList} columns={columnsOrderAse}
                                                event={["detail"]}

                                                add={{
                                                    status: false,
                                                }}


                                                addTable={{
                                                    status: false,
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

export default Ase;