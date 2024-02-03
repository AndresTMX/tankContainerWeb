import { useContext } from "react";
import supabase from "../../supabase";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { currenDateFormatTz } from "../../Helpers/date";


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

    const updateDateTimeWashing = async (lavado, checklist) => {
        try {

            const { id, id_detalle_entrada } = lavado;
            const { cliente } = lavado.registros_detalles_entradas.clientes || {};


            const { error, data } = await supabase
                .from('lavados')
                .update({ dateInit: currenDateFormatTz })
                .eq('id', id)
                .select();

            if (error) {
                throw new Error('Error al actualizar hora de inicio de lavado')
            }

            if (cliente === 'agmark') {
                const { error: errorConsult, data: dataConsult } = await supabase
                    .from('prelavado_checklist')
                    .select()
                    .eq('registro_detalle_entrada_id', id_detalle_entrada)

                if (errorConsult) {
                    throw new Error(`Error al optener datos de prelavado, error: ${errorConsult.message}`)
                }

                const oldChecklistInString = dataConsult[0].data;
                const oldChecklistInJson = JSON.parse(oldChecklistInString);
                const newChecklist = { ...oldChecklistInJson, ...checklist }
                const newChecklistInString = JSON.stringify(newChecklist);

                const { error: errorSendCheck } = await supabase
                    .from('prelavado_checklist')
                    .update({ data: newChecklistInString })
                    .eq('id', dataConsult[0].id)

                if (errorSendCheck) {
                    throw new Error(`Error al actualizar el checklist de agmark , error: ${errorSendCheck.message}`)
                }

            }

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }


    return { sendConditionWashing, updateDateTimeWashing }

}

export { useCreateConditionsWashing };