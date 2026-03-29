import { ref} from "vue";
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", () => {

  const result = ref('');
  const array = ref()
  const convert = (object) => {
    const calc = (object.inputValue * object.price).toFixed(3);
    result.value = `${object.inputValue} ${object.tag} = ${calc} RUB`;
  }

  const reverse = (object)=> {
  const calc = (object.inputValue / object.price).toFixed(3);
    result.value = `${object.inputValue} RUB = ${calc} ${object.tag}`;
  }

  return { convert, useCurrencyStore, reverse, result };
});
