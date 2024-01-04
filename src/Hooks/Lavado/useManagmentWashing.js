import { useContext } from "react";
import supabase from "../../supabase";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useManagmentWashing() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const sendRevision = async (questions) => {
        try {

            const validate = questions.filter((question) => question.value === '');

            if (validate.length >= 1) {
                throw new Error(`Termina el formulario primero`)
            }

            // const {error} = await supabase
            // .from('')
            // .insert({questions})

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }


    return { sendRevision }

}

export { useManagmentWashing };