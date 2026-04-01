import axios from "axios";

export default {
  install: function (app, options = {}) {
    const API = axios.create({baseURL: options.baseURL || ''});
    app.config.globalProperties.$api = API;
    API.interceptors.response.use(config => {
      return config
    }, error => {
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
  }
}
