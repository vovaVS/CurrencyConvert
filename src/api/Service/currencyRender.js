import {API} from "@/plugins/axiosApi.js";

export const CurrencyRender = async () => {
  try {
    return API.get("/daily_json.js");
  } catch (error) {
    console.log(error);
  }
};
