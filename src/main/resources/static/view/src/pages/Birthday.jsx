import React, {Fragment, useState, useEffect} from 'react';

import {dateFormatter, dateJson, doOpen, USER} from '../js/manage';
import {
    birthday
} from '../js/tablesAndForm';
import Container from "../componets/Container";
import Table from "../componets/Table";
import UserService from "../services/UserService";

const Birthday = (props) => {
    if (USER === null) {
        doOpen('/');
    }

    const [birthdayAll, setBirthdayAll] = useState([]);

    const tableDataBirthday = (month) => {
        UserService.getBirthday(month).then((response) => {
            let list = [];
            for (let user of response.data) {
                if (user.birthtDay !== null) {
                    user.birthtDay = dateFormatter(user.birthtDay);
                }
                list.push(user);
            }
            setBirthdayAll(list);
        }).catch(e => {
            alert("Process error");
            console.log(e);
        });
    }

    useEffect(() => {
        tableDataBirthday(dateJson().month);
    }, [])

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
                       nav={[nav, {name: "Products", url: "/products", icon: "store-alt", status: ""},
                           {name: "Birthday", url: "/birthday", icon: "birthday-cake", status: "shadow"}]}
                       container={[
                           <Table name={<h5 className="m-2">Persons: {birthdayAll.length}</h5>}
                                  data={birthdayAll} columns={birthday}
                                  event={[]}

                                  add={{
                                      status: false,
                                  }}


                                  addTable={{
                                      status: false,
                                  }}

                           />]}/>
        </Fragment>
    );
}

export default Birthday;