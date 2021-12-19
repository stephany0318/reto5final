export const columnsUser = [
    {
        column: "Identification",
        value: "identification"
    }, {
        column: "Name",
        value: "name"
    }, {
        column: "Address",
        value: "address"
    }, {
        column: "CellPhone",
        value: "cellPhone"
    }, {
        column: "Email",
        value: "email"
    }, {
        column: "Zone",
        value: "zone"
    }, {
        column: "Type",
        value: "type"
    }];

export let userListData = [
    {
        size: "6",
        title: "Identification",
        name: "identification",
        status: "required",
        type: "number"
    },
    {
        size: "6",
        title: "Name",
        name: "name",
        status: "required",
        type: "text"
    },
    {
        size: "6",
        title: "Address",
        name: "address",
        status: "required",
        type: "text"
    },
    {
        size: "6",
        title: "CellPhone",
        name: "cellPhone",
        status: "required",
        type: "number"
    },
    {
        size: "6",
        title: "Email",
        name: "email",
        status: "required",
        type: "email"
    },
    {
        size: "6",
        title: "Password",
        name: "password",
        status: "required",
        type: "password"
    },
    {
        size: "6",
        title: "Zone",
        name: "zone",
        status: "required",
        type: "text"
    },
    {
        size: "6",
        title: "Type",
        name: "type",
        type: "select",
        option: [{
            value: "COORD",
            name: "Coordinadores de Zona"
        }, {
            value: "ASE",
            name: "Asesores Comerciales"
        }, {
            value: "ADMIN",
            name: "Administrador"
        }]
    },
    {
        size: "6",
        title: "BirthtDay",
        name: "birthtDay",
        status: "required",
        type: "date"
    },
    {
        size: "6",
        title: "Month BirthtDay",
        name: "monthBirthtDay",
        type: "select",
        option: [{
            value: "1",
            name: "Enero"
        }, {
            value: "2",
            name: "Febrero"
        }, {
            value: "3",
            name: "Marzo"
        }, {
            value: "4",
            name: "Abril"
        }, {
            value: "5",
            name: "Mayo"
        }, {
            value: "6",
            name: "Junio"
        }, {
            value: "7",
            name: "Julio"
        }, {
            value: "8",
            name: "Agosto"
        }, {
            value: "9",
            name: "Septiembre"
        }, {
            value: "10",
            name: "Octubre"
        }, {
            value: "11",
            name: "Noviembre"
        }, {
            value: "12",
            name: "Diciembre"
        }]
    }
]

export const columnsProduct = [
    {
        column: "Reference",
        value: "reference"
    }, {
        column: "Category",
        value: "category"
    },
    {
        column: "Description",
        value: "description"
    }, {
        column: "Price",
        value: "price"
    }, {
        column: "Availability",
        value: "availability_table"
    },
    {
        column: "Quantity",
        value: "quantity"
    }
];

export const columnsProductAseCli = [
    {
        column: "Reference",
        value: "reference"
    }, {
        column: "Category",
        value: "category"
    },
    {
        column: "Description",
        value: "description"
    }, {
        column: "Price",
        value: "price"
    }
];

export let productListData = [
    {
        size: "6",
        title: "Category",
        name: "category",
        status: "required",
        type: "text"
    },
    {
        size: "6",
        title: "Availability",
        name: "availability",
        type: "select",
        option: [{
            value: true,
            name: "Si"
        }, {
            value: false,
            name: "No"
        }]
    },
    {
        size: "6",
        title: "Price",
        name: "price",
        status: "required",
        type: "number"
    },
    {
        size: "6",
        title: "Quantity",
        name: "quantity",
        status: "required",
        type: "number"
    },
    {
        size: "6",
        title: "Description",
        name: "description",
        status: "required",
        type: "text"
    },
    {
        size: "6",
        title: "Photography",
        name: "photography",
        status: "required",
        type: "text"
    }
];

export const columnsOrder = [
    {
        column: "Id user",
        value: "salesMan_identification"
    }, {
        column: "Names",
        value: "salesMan_name"
    },
    {
        column: "Email",
        value: "salesMan_email"
    }, {
        column: "Date",
        value: "registerDay"
    },
    {
        column: "Id Order",
        value: "id"
    },
    {
        column: "Status",
        value: "status"
    }
];

export const columnsProductOrder = [
    {
        column: "Reference",
        value: "reference"
    }, {
        column: "Category",
        value: "category"
    },
    {
        column: "Description",
        value: "description"
    },
    {
        column: "Price",
        value: "price"
    },
    {
        column: "Quantity",
        value: "quantity"
    }
];

export const columnsOrderProduct = columnsProductOrder;

export let formCount = [
    {
        size: "12",
        title: "Count",
        name: "count_order",
        status: "required",
        type: "number"
    }
]

export const columnsOrderAse = [
    {
        column: "Date",
        value: "registerDay"
    },
    {
        column: "No. Order",
        value: "id"
    },
    {
        column: "Status",
        value: "status"
    }
];


export const columnsOrderCoord = [
    {
        column: "Id user",
        value: "salesMan_identification"
    }, {
        column: "Names",
        value: "salesMan_name"
    },
    {
        column: "Email",
        value: "salesMan_email"
    }, {
        column: "Date",
        value: "registerDay"
    },
    {
        column: "Id Order",
        value: "id"
    }
];

export const infoOrderAse = [
    {
        size: "6",
        title: "Identification User",
        name: "salesMan_identification"
    }, {
        size: "6",
        title: "Name User",
        name: "salesMan_name"
    },
    {
        size: "6",
        title: "Email User",
        name: "salesMan_email"
    },
    {
        size: "6",
        title: "Date",
        name: "registerDay"
    },
    {
        size: "6",
        title: "No. Order",
        name: "id"
    }
];

export const birthday = [
    {
        column: "Name",
        value: "name"
    },
    {
        column: "Email",
        value: "email"
    }, {
        column: "BirthtDay",
        value: "birthtDay"
    }, {
        column: "Zone",
        value: "zone"
    }]