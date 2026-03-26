import api from "@/api/axiosApi";

export const CurrencyRender = async () => {
  try {
    const response = await api.get("/daily_json.js");
    return response;
  } catch (error) {
    console.log(error);
  }
};

