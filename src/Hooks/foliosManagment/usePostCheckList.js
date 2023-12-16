import supabase from "../../supabase";
import { useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { usePostRegister } from "../registersManagment/usePostRegister";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import { AuthContext } from "../../Context/AuthContext";

function usePostCheckList() {

    const { key } = useContext(AuthContext)
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext)

    const tableManiobrasChecklist = 'maniobras_checklist'
    const tableReparaciones = 'reparaciones'
    //cloudinary data
    const preset = 'mvtjch9n';
    const folderName = 'maniobras_checklist';

    const [errorPost, setErrorPost] = useState(false)
    const [request, setRequest] = useState(false)
    const { updateStatusRegisters } = usePostRegister();

    const sendCheckList = async (checklist, flatCheckList) => {
        // dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true })
        // setErrorPost(false)
        // setRequest(false)

        try {
            //recuperar imagenes con preguntas        
            const imagesWhitQuestion = flatCheckList.filter((question) => question.image != '');
            //extraer solo las imagenes
            const images = imagesWhitQuestion.map((item) => item.image);

            const formData = new FormData();
        } catch (error) {

        }




        // try {

        //     if (state.status === 'interna' || state.status === 'externa') {

        //         const { dataRepair, errorRepair } = await supabase
        //             .from(tableReparaciones)
        //             .insert({
        //                 id_usuario: key,
        //                 id_detalle_registro: state.selectItem.id,
        //                 numero_tanque: state.selectItem.numero_tanque,
        //                 status: 'pendiente',
        //                 tipo_reparacion: state.status,
        //             })

        //         if (errorRepair) {
        //             setErrorPost(errorRepair)
        //             dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: errorRepair })
        //         }
        //     }

        // } catch (error) {
        //     setErrorPost(error)
        // }

        // try {

        //     const updateStatus = state.status != 'prelavado'? 'reparacion' : state.status;

        //     if (!errorPost) {

        //         const { data, error } = await supabase
        //             .from(tableManiobrasChecklist)
        //             .insert({ ...checklist })
        //             .select()
        //         if (error) {
        //             setErrorPost(error)
        //             dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: error.message })
        //         } else {
        //             setRequest(data)
        //             updateStatusRegisters(checklist.registro_detalle_entrada_id, updateStatus)
        //         }

        //         dispatch({ type: actionTypes.setSelectItem, payload: false })
        //         dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
        //         dispatch({ type: actionTypes.setTypeRegister, payload: 'checklist_realizados' })
        //     }

        // } catch (error) {
        //     setErrorPost(error)
        //     dispatch({ type: actionTypes.setSelectItem, payload: false })
        //     dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
        //     dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: error })
        // }

    }

    return { sendCheckList, errorPost, request }

}

export { usePostCheckList };
