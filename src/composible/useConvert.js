import { ref} from "vue";

export const useConvert = () => {

  const result = ref('');
  const convert = (object, value_select, default_tag) => {
    const meters = object.inputValue * value_select;
    const calc = (meters / object.value);
    result.value = `${object.inputValue} ${default_tag} = ${calc} ${object.tag}`;
  }

  const reverse = (object, default_tag) => {
    const calc = (object.inputValue / object.value);
    result.value = `${object.inputValue} ${default_tag} = ${calc} ${object.tag}`;
  }
  return { useConvert, convert, reverse, result};
}

