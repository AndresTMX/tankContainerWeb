import supabase from "../../supabase";
import { useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal} from "../../Reducers/GlobalReducer";
import { usePostRegister } from "../registersManagment/usePostRegister";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function usePostCheckList() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext)

    const tableManiobrasChecklist = 'maniobras_checklist'

    const [errorPost, setErrorPost] = useState(false)
    const [request, setRequest] = useState(false)
    const { updateStatusRegisters } = usePostRegister();

    const sendCheckList = async (checklist) => {
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true })
        setErrorPost(false)
        setRequest(false)
        const { data, error } = await supabase
            .from(tableManiobrasChecklist)
            .insert({ ...checklist })
            .select()
        if (error) {
            setErrorPost(error)
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: error.message })
        } else {
            setRequest(data)
            updateStatusRegisters(checklist.registro_detalle_entrada_id, state.status)
        }

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
        dispatch({type: actionTypes.setSelectItem, payload: false})
    }

    return { sendCheckList, errorPost, request }

}

export { usePostCheckList };
