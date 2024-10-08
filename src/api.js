import axios from "axios";

const api = axios.create({
    baseURL:"http://124.123.41.13:8080/admins",

});

export default api;