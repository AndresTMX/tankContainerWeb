import { useContext } from "react";
import supabase from "../../supabase";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useCreateConditionsWashing() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const sendConditionWashing = async (newRegister, callback) => {
        try {

            //enviar el nuevo registro de condiciones de lavado
            const { error: errorSendWashing } = await supabase
                .from('condiciones_lavado')
                .insert({ ...newRegister })

            if (errorSendWashing) {
                throw new Error(`Error al guardar condiciones de lavado, error: ${errorSendWashing.message}`)
            }

            //actualizar el registro de lavado a lavado
            const { errorUpdateStatus } = await supabase
                .from('lavados')
                .update({ status: 'lavado' })
                .eq('id', newRegister.lavado_id)

            if (errorUpdateStatus) {
                throw new Error(`Error al guardar condiciones de lavado, error: ${errorUpdateStatus.message}`)
            }

            //actualizar el registro general a lavado
            const { errorUpdateGeneral } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'lavado' })
                .eq('id', newRegister.id_detalle_entrada)

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