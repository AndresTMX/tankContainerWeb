
export function validateRepeat(id, array) {

    return array.find((item) => item.registro_id === id);

}

export function deleteItem(item, array) {
    const newArray = array.filter((element) => element.registro_id != item.registro_id)

    if(newArray.length > 0){
        return newArray
    }else{
        return []
    }
}


export function ToggleItem(item, array) {
    let newArray
    const repeat = validateRepeat(item.registro_id, array);

    if (repeat) {
        newArray = deleteItem(item, array)
    } else {
        newArray = [...array]
        newArray.push(item)
    }

    return newArray
}