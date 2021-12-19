import React, {Fragment, useState, useEffect} from 'react';

import {dateFormatter, doOpen, USER} from '../js/manage';
import {columnsUser, userListData, columnsProduct, productListData} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import UserService from "../services/UserService";
import ProductService from "../services/ProductService";
import Load from "../componets/Load";

const Admin = (props) => {
    //Load -------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (USER === null) {
        handleShow();
        doOpen('/');
    }

    //User -------------------------------------------------------
    const [userList, setUserList] = useState([]);

    const tableDataUser = () => {
        UserService.getAll()
            .then((response) => {
                let list = [];
                for (let user of response.data) {
                    user.birthtDay = dateFormatter(user.birthtDay);
                    list.push(user);
                }
                setUserList(list);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataUser();
    }, [])

    const onRegisterUser = (user) => {
        handleShow();
        let json = {};
        for (let val of user) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        UserService.existsEmail(json.email)
            .then((response) => {
                if (!response.data) {
                    UserService.save(json)
                        .then((response) => {
                            UserService.existsEmail(json.email)
                                .then((response) => {
                                    if (response.data) {
                                        tableDataUser();
                                        handleClose();
                                        alert('Save user');
                                    } else {
                                        handleClose();
                                        alert('Could not save data');
                                    }
                                }).catch(e => {
                                handleClose();
                                alert("Process error");
                                console.log(e);
                            });
                        }).catch(e => {
                        handleClose();
                        alert("Process error");
                        console.log(e);
                    });
                } else {
                    alert("The email is already registered, try another");
                    handleClose();
                }
            })
    }

    const onEditUser = (user, data) => {
        handleShow();
        let json = {};

        for (let val of user) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        json['id'] = data.id;
        UserService.update(json)
            .then((response) => {
                tableDataUser();
                handleClose();
                alert('updated data');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onRemoveUser = (user) => {
        handleShow();
        UserService.remove(user.id)
            .then((response) => {
                UserService.existsEmail(user.email)
                    .then((response) => {
                        if (!response.data) {
                            tableDataUser();
                            handleClose();
                            alert('Remove user');
                        } else {
                            handleClose();
                            alert('Could not delete user');
                        }
                    }).catch(e => {
                    handleClose();
                    alert("Process error");
                    console.log(e);
                });
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    //Product -------------------------------------------------------
    const [productList, setProductList] = useState([]);

    const tableDataProduct = () => {
        ProductService.getAll()
            .then((response) => {
                for (let product of response.data) {
                    if (product.availability) {
                        product["availability_table"] = "Si";
                    } else {
                        product["availability_table"] = "No";
                    }
                    response.data[product] = product;
                }

                setProductList(response.data);
            }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataProduct();
    }, [])

    const onRegisterProduct = (product) => {
        handleShow();
        let json = {};
        for (let val of product) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        ProductService.save(json)
            .then((response) => {
                tableDataProduct();
                handleClose();
                alert('Save Product');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onEditProduct = (product, data) => {
        handleShow();
        let json = {};

        for (let val of product) {
            json[val.name] = val.value;

            if (val.value === '') {
                handleClose();
                alert('Invalid input values');
                return;
            }
        }

        json['reference'] = data.reference;

        ProductService.update(json)
            .then((response) => {
                tableDataProduct();
                handleClose();
                alert('updated data');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    const onRemoveProduct = (user) => {
        handleShow();
        ProductService.remove(user.reference)
            .then((response) => {
                tableDataProduct();
                handleClose();
                alert('Remove Product');
            }).catch(e => {
            handleClose();
            alert("Process error");
            console.log(e);
        });
    }

    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[{name: "table", url: "/admin", icon: "table", status: "shadow"}, {
                           name: "Products",
                           url: "/products",
                           icon: "store-alt",
                           status: ""
                       },
                           {name: "Birthday", url: "/birthday", icon: "birthday-cake", status: ""}]}
                       container={[<Table name={<h5 className={"m-2"}>User: {productList.length}</h5>}
                                          data={userList} columns={columnsUser}
                                          event={["update", "remove"]}

                                          add={{
                                              name: "Register",
                                              status: true,
                                              form: {
                                                  buttonName: "Register",
                                                  width: "width-600",
                                                  event: onRegisterUser,
                                                  data: userListData,
                                                  clear: true
                                              }
                                          }}

                                          addTable={{
                                              status: false,
                                          }}

                                          update={{
                                              name: "Update",
                                              color: "text-color-yellow",
                                              form: {
                                                  buttonName: "Update",
                                                  width: "width-600",
                                                  event: onEditUser,
                                                  data: userListData,
                                                  clear: false,
                                                  typeId: "id"
                                              }
                                          }}

                                          remove={{
                                              name: "Remove",
                                              color: "text-color-red",
                                              event: onRemoveUser
                                          }}
                       />,

                           <Table name={<h5 className={"m-2"}>Products: {productList.length}</h5>}
                                  data={productList} columns={columnsProduct}
                                  event={["update", "remove"]}

                                  add={{
                                      name: "Register",
                                      status: true,
                                      form: {
                                          buttonName: "Register",
                                          width: "width-600",
                                          event: onRegisterProduct,
                                          data: productListData,
                                          clear: true
                                      }
                                  }}

                                  addTable={{
                                      status: false,
                                  }}

                                  update={{
                                      name: "Update",
                                      color: "text-color-yellow",
                                      form: {
                                          buttonName: "Update",
                                          width: "width-600",
                                          event: onEditProduct,
                                          data: productListData,
                                          clear: false,
                                          typeId: "reference"
                                      }
                                  }}

                                  remove={{
                                      name: "Remove",
                                      color: "text-color-red",
                                      event: onRemoveProduct
                                  }}
                           />]}/>
            <Load show={show}/>
        </Fragment>
    );
}

export default Admin;