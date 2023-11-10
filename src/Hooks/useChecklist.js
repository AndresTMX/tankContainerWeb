import { actionTypes } from "../Reducers";
import { useState, useContext} from "react";
import { DevelopmentContext } from "../Context";

function useCheckList(listInputs) {

    // const [nextStep, setNextStep] = useState('')
    const [state, dispatch] = useContext(DevelopmentContext);
    const [listCheck, SetListCheck] = useState(listInputs);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [modalComent, setModalComent] = useState(false);
    
    const ValidateInputs = () => {
        
        const validateInputs =  listCheck.filter((question) => question.value === null).length

        if(validateInputs > 0){
            dispatch({type: actionTypes.setNotification, payload: 'Complete el checklist para continuar'})
            return false
        }

        return true
    }
    
    const ChangueInput = (indexInput, newValue) => {

        const copyState = [...listCheck]

        copyState[indexInput].value = newValue

        SetListCheck(copyState)
    } 
    //     const copyState = [...listCheck]

    //     copyState[indexInput].no = !copyState[indexInput].no

    //     SetListCheck(copyState)
    // } 

    const ChangueComent = (event) => {
        const copyState = [...listCheck]

        copyState[indexQuestion].coment = event.target.value

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

    // const ChangueNextStep = (event) => {
    //     setNextStep(event.target.value)
    // }

    const SelectQuestionComent = (index) => {
        setIndexQuestion(index)
        setModalComent(!modalComent)

    }

    const ToggleModalComent = () => {
        setModalComent(!modalComent)
    }


    const actions = {ChangueInput, ChangueComent, ChangueImage, DiscardImage,SelectQuestionComent, ToggleModalComent, ValidateInputs}

    const states = {listCheck, indexQuestion, modalComent}

    return {actions, states}
}

export {useCheckList};