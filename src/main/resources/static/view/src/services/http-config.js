import axios from "axios";

const API = 'http://localhost:8080/api';
//const API = 'http://132.226.37.129:8080/';

export default axios.create({
    baseURL: API,
    headers: {
        "Content-type": "application/json"
    }
});