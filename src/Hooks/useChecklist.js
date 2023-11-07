import { useState } from "react";

function useCheckList(listInputs) {

    const [listCheck, SetListCheck] = useState(listInputs)
    const [nextStep, setNextStep] = useState('')
    
    const ChangueInput = (indexInput, checkbox) => {

        const copyState = [...listCheck]
      
        let prevState1 = copyState[indexInput].value 
        let prevState2 = copyState[indexInput].value2

        if(prevState1 === null && checkbox === 1){
            copyState[indexInput].value = true
            copyState[indexInput].value2 = false
        }

        if(prevState1 === true && checkbox === 1){
            copyState[indexInput].value = false
            copyState[indexInput].value2 = false
        }

        if(prevState1 === false && checkbox === 1){
            copyState[indexInput].value = true
            copyState[indexInput].value2 = false
        }

        if(prevState2 === null && checkbox === 2){
            copyState[indexInput].value = false
            copyState[indexInput].value2 = true
        }

        if(prevState2 === true && checkbox === 2){
            copyState[indexInput].value = true
            copyState[indexInput].value2 = false
        }

        if(prevState2 === false && checkbox === 2){
            copyState[indexInput].value = false
            copyState[indexInput].value2 = true
        }

        SetListCheck(copyState)
    } 
    //     const copyState = [...listCheck]

    //     copyState[indexInput].no = !copyState[indexInput].no

    //     SetListCheck(copyState)
    // } 

    const ChangueComent = (indexInput, value) => {
        const copyState = [...listCheck]

        copyState[indexInput].coment = value

        SetListCheck(copyState)
    }

    const ChangueImage = (indexInput, event) => {
        const copyState = [...listCheck]

        const file = event.target.files[0];
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

    const ChangueNextStep = (event) => {
        setNextStep(event.target.value)
    }

    const actions = {ChangueInput, ChangueComent, ChangueImage, DiscardImage, ChangueNextStep}

    const states = {listCheck, nextStep}

    return {actions, states}
}

export {useCheckList};