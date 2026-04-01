
export const CurrencyRender = async (api) => {
  try {
    return api.get("/daily_json.js");
  } catch (error) {
    console.log(error);
  }
};
