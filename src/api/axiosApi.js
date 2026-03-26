import axios from "axios";

const api = axios.create({ 
    baseURL: "https://www.cbr-xml-daily.ru",
    timeout: 30000,
});

export default api;
