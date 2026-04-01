
export const validator = (object) =>{
    return !Number(object.inputValue) || object.inputValue === "" || !object.tag ||
      object.tag === "" || !Number(object.value);
}
