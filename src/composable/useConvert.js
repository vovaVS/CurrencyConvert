import {ref} from "vue";

export const useConvert = () => {

  const result = ref(0);

  const convert = (object, value_select) => {
    const meters = object.inputValue * value_select;
    result.value = (meters / object.value);
  }
  return {useConvert, convert, result};
}

