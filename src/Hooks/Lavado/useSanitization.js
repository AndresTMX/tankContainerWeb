import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";

function useSanitization() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const completeSanitization = async (sanitization, idRegister, idWashing, callback) => {
        try {

            //actualizar status de registro general
            const { error: errorUpdateStatus } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'sellado' })
                .eq('id', idRegister)

            if (errorUpdateStatus) {
                throw new Error(`Error al actualizar registro general, error: ${errorUpdateStatus.message}`)
            }

            //actualizar registro y status de lavado
            const { error } = await supabase
                .from('lavados')
                .update({ ...sanitization, status: 'sellado' })
                .eq('id', idWashing)

            if (error) {
                await supabase.from('registros_detalles_entradas').update({ status: 'sanitizado' }).eq('id', idRegister)
                throw new Error(`Error al actualizar registro de lavado, error: ${error.message}`)
            }

            callback()
        } catch (error) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: error.message
            })
        }
    }

    return { completeSanitization }

}

export { useSanitization };