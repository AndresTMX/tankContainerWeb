import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function useDownContainer() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext);

    const downContainerToManiobra = async (idRegisterDetail, tanque) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        })

        try {
            const { error } = await supabase.from('tanques')
                .update({ status: 'eir' })
                .eq('tanque', tanque)

            if (error) {
                throw new Error(error.message)
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Error eliminar el registro del tanque ${tanque}`
            })
        }

        try {
            const { error } = await supabase.from('registros_detalles_entradas')
                .update({ status: 'eir' })
                .eq('id', idRegisterDetail)

            if (error) {
                throw new Error(error.message)
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Error eliminar el registro del tanque ${tanque}`
            })
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Tanque bajado a maniobras`
            })
        }, 1200)

    }

    return { downContainerToManiobra }

}

export { useDownContainer };