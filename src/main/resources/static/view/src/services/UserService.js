import http from './http-config';

const authenticate = (email, password) => {
    return http.get(`/user/${email}/${password}`);
}

const existsEmail = (email) => {
    return http.get(`/user/emailexist/${email}`);
}

const getAll = () => {
    return http.get("/user/all");
}

const get = (id) => {
    return http.get(`/user/${id}`);
}

const save = (data) => {
    return http.post(`/user/new`, data);
}

const update = (data) => {
    return http.put(`/user/update`, data);
}

const remove = (id) => {
    return http.delete(`/user/${id}`);
}

const getBirthday = (month) => {
    return http.get(`/user/birthday/${month}`);
}


const exportedObject = {
    getAll,
    get,
    authenticate,
    save,
    update,
    remove,
    existsEmail,
    getBirthday
}
export default exportedObject;

  
