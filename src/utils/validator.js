
export const validator = (inputValue, tag, price) =>{
    if( !Number(inputValue) || inputValue === "" || !tag || tag === "" || !Number(price)){
        return true;
    }
    return false;
}