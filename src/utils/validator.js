
export const validator = (object) =>{
    console.log(object);
    return !Number(object.inputValue) || object.inputValue === "" || !object.tag ||
      object.tag === "" || !Number(object.price);
}
