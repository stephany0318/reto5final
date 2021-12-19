import React, {Fragment, useState, useEffect} from 'react';

import {doOpen, USER} from '../js/manage';
import {
    columnsProductAseCli
} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import ProductService from "../services/ProductService";

const Products = (props) => {

    if (USER === null) {
        doOpen('/');
    }

    const [inputFilter, setInputFilter] = useState([]);
    const [productAll, setProductAll] = useState([]);

    const tableDataProduct = (event) => {
        event.then((response) => {
            for (let product of response.data) {
                product["count_order"] = 1;
                if (product.availability) {
                    product["availability_table"] = "Si";
                } else {
                    product["availability_table"] = "No";
                }
                response.data[product] = product;
            }

            setProductAll(response.data);
        }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataProduct(ProductService.getAll());
    }, [])


    function methodFilter(type) {
        let value = document.getElementById("txtFilter").value;
        switch (type) {
            case 'price':
                tableDataProduct(ProductService.priceFilter(value));
                break;
            case 'description':
                tableDataProduct(ProductService.descriptionFilter(value));
                break;
        }
    }

    function inputNumbre() {
        return [<input id="txtFilter" type="number" className="form-control mt-4 col-md-8 mb-2 text-center"/>,
            <div className="card-body mx-auto col-md-6">
                <button className="btn bg-gradient-primary col-md-12"
                        onClick={e => methodFilter("price")}>Ok
                </button>
            </div>];
    }

    function inputDescription() {
        return [<input id="txtFilter" type="text" className="form-control mt-4 col-md-8 mb-2 text-center"/>,
            <div className="card-body mx-auto col-md-6">
                <button className="btn bg-gradient-primary col-md-12"
                        onClick={e => methodFilter("description")}>Ok
                </button>
            </div>];
    }

    const inputTypeValue = () => {
        let value = document.getElementById('selectFilterData').value;
        switch (value) {
            case 'price':
                setInputFilter(inputNumbre);
                break;
            case 'description':
                setInputFilter(inputDescription);
                break;
            case 'todo':
                tableDataProduct(ProductService.getAll());
                setInputFilter([]);
                break;
        }
    }

    let nav = [];

    switch (USER.type) {
        case 'ADMIN':
            nav = {name: "table", url: "/admin", icon: "table", status: ""};
            break;
        case 'ASE':
            nav = {name: "Orders", url: "/ase", icon: "table", status: ""};
            break;
        case 'COORD':
            nav = {name: "table", url: "/coord", icon: "table", status: ""};
            break;
    }


    return (
        <Fragment>
            <Container title="System" profile_name={USER.name} footer={{
                name: "Product store",
                boxs: [{name: "GitHub", url: "https://github.com/Sergio-mix", icon: "github", status: ""}]
            }}
                       nav={[nav, {name: "Products", url: "/products", icon: "store-alt", status: "shadow"},
                           {name: "Birthday", url: "/birthday", icon: "birthday-cake", status: ""}]}
                       container={[
                           <div className="mx-auto">
                               <h2 className="mb-3 text-center">Filter</h2>
                               <div className="container content mb-4 col-lg-8 p-3">
                                   <select className="form-select text-center" id={"selectFilterData"}
                                           onClick={inputTypeValue}>
                                       <option value="todo">All</option>
                                       <option value="price">Price</option>
                                       <option value="description">Description</option>
                                   </select>
                                   {inputFilter}
                               </div>
                               <Table name={<h5 className="m-2">Products: {productAll.length}</h5>}
                                      data={productAll} columns={columnsProductAseCli}
                                      event={[]}

                                      add={{
                                          status: false,
                                      }}


                                      addTable={{
                                          status: false,
                                      }}

                               /></div>]}/>
        </Fragment>
    );
}

export default Products;