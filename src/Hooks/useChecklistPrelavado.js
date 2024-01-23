import { useState, useContext } from "react";
import { actionTypes as actionTypesGlobal } from "../Reducers/GlobalReducer";
import { PrelavadoContext } from "../Context/PrelavadoContext";
import { actionTypes } from "../Reducers/PrelavadoReducer";
import { GlobalContext } from "../Context/GlobalContext";

function useCheckList(listInputs) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(PrelavadoContext)
    const { checklist } = state;
    
    const [listCheck, SetListCheck] = useState(listInputs);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [modalComent, setModalComent] = useState(false);

    const ValidateInputs = () => {
        const validateInputs = listCheck.filter(
            (question) => question.value === null
        ).length;

        if (validateInputs > 0) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: "Complete el checklist para continuar",
            });
            return false;
        }

        return true;
    };

    const ChangueInput = (indexInput, newValue) => {
        const copyState = [...listCheck];

        copyState[indexInput].value = newValue;

        SetListCheck(copyState);
    };

    const ChangueComent = (event) => {
        const copyState = [...listCheck];

        copyState[indexQuestion].coment = event.target.value;

        SetListCheck(copyState);
    };

    const OnChangueComent = (event) => {
        setComent(event.target.value);
    };

    const ChangueImage = (indexInput, event) => {
        const copyState = [...listCheck];

        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        if (file) {
            copyState[indexInput].image = file;
            copyState[indexInput].preview = urlImage;
        }

        SetListCheck(copyState);
    };

    const DiscardImage = (indexInput) => {
        const copyState = [...listCheck];

        copyState[indexInput].image = "";
        copyState[indexInput].preview = "";

        SetListCheck(copyState);
    };

    const SelectQuestionComent = (index) => {
        setIndexQuestion(index);
        setModalComent(!modalComent);
    };

    const ToggleModalComent = () => {
        setModalComent(!modalComent);
    };

    const nextStep = (state) => {
        dispatch({ type: actionTypes.setCheckList, payload: state });
    };

    const actions = {
        ChangueInput,
        OnChangueComent,
        ChangueImage,
        DiscardImage,
        SelectQuestionComent,
        ToggleModalComent,
        ValidateInputs,
        ChangueComent,
        nextStep
    };

    const states = { listCheck, indexQuestion, modalComent, checklist };

    return { actions, states };
}

export { useCheckList };