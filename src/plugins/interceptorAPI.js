import api from "@/api/axiosApi";

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 500) {
      console.error("Нет подключения к интернету");
    }
    if (error.response.status === 404) {
      console.error("Не найдено!");
    }
    return Promise.reject(error);
  },
);
