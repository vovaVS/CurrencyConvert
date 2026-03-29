import axios from "axios";

export  const API = axios.create({baseURL: 'https://www.cbr-xml-daily.ru'});

export default {
  install: function (app, options = {}) {
    API.interceptors.response.use(
      config => {
        console.log(config);
        return config
      },
      error => {
        if (error.response.status === 500) {
          console.error("Нет подключения к интернету");
        }
        if (error.response.status === 404) {
          console.error("Не найдено!");
        }
        if (error.response.status === 105) {
          console.error("Не найдено!");
        }
        return Promise.reject(error);
      });
    app.config.globalProperties.$axios = API;
  }
}
