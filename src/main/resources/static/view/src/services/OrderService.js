import http from './http-config';


const getAll = () => {
    return http.get(`/order/all`);
}

const getAllUser = (id) => {
    return http.get(`/order/salesman/${id}`);
}

const get = (id) => {
    return http.get(`/order/${id}`);
}

const save = (data) => {
    return http.post(`/order/new`, data);
}

const update = (data) => {
    return http.put(`/order/update`, data);
}

const remove = (id) => {
    return http.delete(`/order/${id}`);
}

const allFilterDate = (date, id) => {
    return http.get(`/order/date/${date}/${id}`);
}

const allFilterStatus = (state, id) => {
    return http.get(`/order/state/${state}/${id}`);
}

const exportedObject = {
    getAll,
    get,
    save,
    update,
    remove,
    getAllUser,
    allFilterDate,
    allFilterStatus
}

export default exportedObject;


