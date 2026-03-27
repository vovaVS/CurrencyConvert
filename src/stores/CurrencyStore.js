import { ref} from "vue";
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", () => {
  
  const result = ref('');
  const convert = (value, price, tag) => {
  const calc = (value * price).toFixed(3);;
    result.value = `${value} ${tag} = ${calc} RUB`;
  }

  const reverse = (value, price, tag)=> {
  const calc = (value / price).toFixed(3);
    result.value = `${value} RUB = ${calc} ${tag}`;
  }
  return { convert, useCurrencyStore, reverse, result };
});
