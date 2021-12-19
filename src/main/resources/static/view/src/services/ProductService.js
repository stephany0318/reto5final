import http from './http-config';


const getAll = () => {
    return http.get(`/chocolate/all`);
}

const get = (id) => {
    return http.get(`/chocolate/${id}`);
}

const save = (data) => {
    return http.post(`/chocolate/new`, data);
}

const update = (data) => {
    return http.put(`/chocolate/update`, data);
}

const remove = (id) => {
    return http.delete(`/chocolate/${id}`);
}

const priceFilter = (prece) => {
    return http.get(`/chocolate/price/${prece}`);
}

const descriptionFilter = (description) => {
    return http.get(`/chocolate/description/${description}`);
}



const exportedObject = {
    getAll,
    get,
    save,
    update,
    remove,
    priceFilter,
    descriptionFilter,
}
export default exportedObject;


