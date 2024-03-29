import { actionTypes as actionTypesGlobal} from "../Reducers/GlobalReducer";
import { actionTypes } from "../Reducers/ManiobrasReducer";
import { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { ManiobrasContext } from "../Context/ManiobrasContext";

function useCheckList(listInputs) {
  const [state, dispatch] = useContext(ManiobrasContext)
  const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
  const { maniobrasCheckList } = state;
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
    dispatch({ type: actionTypes.setManiobrasCheck, payload: state });
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

  const states = { listCheck, indexQuestion, modalComent, maniobrasCheckList };

  return { actions, states };
}

export { useCheckList };
