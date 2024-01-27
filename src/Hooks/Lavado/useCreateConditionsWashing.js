import { useContext } from "react";
import supabase from "../../supabase";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useCreateConditionsWashing() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const sendConditionWashing = async (newRegister, idLavado, idDetalle, callback) => {
        try {

            //actualizar el registro de lavado a lavado
            const { errorUpdateStatus } = await supabase
                .from('lavados')
                .update({ ...newRegister, status: 'lavado' })
                .eq('id', idLavado)

            if (errorUpdateStatus) {
                throw new Error(`Error al guardar condiciones de lavado, error: ${errorUpdateStatus.message}`)
            }

            //actualizar el registro general a lavado
            const { errorUpdateGeneral } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'lavado' })
                .eq('id', idDetalle)

            if (errorUpdateGeneral) {
                throw new Error(`Error al actualizar registro general, error: ${errorUpdateStatus.message}`)
            }

            callback();

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }


    return { sendConditionWashing }

}

export { useCreateConditionsWashing };