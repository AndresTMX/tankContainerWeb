import { useState } from "react";

function useCheckList(listInputs) {

    const [listCheck, SetListCheck] = useState(listInputs)
    
    const ChangueInput = (indexInput) => {

        const copyState = [...listCheck]

        copyState[indexInput].value = !copyState[indexInput].value

        SetListCheck(copyState)
    } 

    const ChangueComent = (indexInput, value) => {
        const copyState = [...listCheck]

        copyState[indexInput].coment = value

        SetListCheck(copyState)
    }

    const ChangueImage = (indexInput, e) => {
        const copyState = [...listCheck]

        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        if(file){
            copyState[indexInput].image = file
            copyState[indexInput].preview = urlImage
        }

        SetListCheck(copyState)
    }

    const DiscardImage = (indexInput) => {
        const copyState = [...listCheck]

            copyState[indexInput].image = ''
            copyState[indexInput].preview = ''
        

        SetListCheck(copyState)
    }

    const actions = {ChangueInput, ChangueComent, ChangueImage, DiscardImage}

    const states = {listCheck}

    return {actions, states}
}

export {useCheckList};