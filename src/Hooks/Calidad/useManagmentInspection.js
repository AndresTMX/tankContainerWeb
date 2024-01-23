import { useContext } from "react";
import supabase from "../../supabase";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { AuthContext } from "../../Context/AuthContext";

function useManagmentInspection(updater) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { key } = useContext(AuthContext);


    const sendInspectPrewashing = async (register, idWashing, typeWashing, cargasInString, numero_tanque, numero_pipa, carga) => {
        try {

            //almacena el checklist de revision de prelavado 
            const { error, data: dataRevision } = await supabase
                .from('prelavados_revisiones')
                .insert({ ...register })
                .select()

            if (error) {
                throw new Error(`Error al registrar nueva ispección de prelevado: ${error.message}`)
            }

            //asigna el tipo de lavado al lavado
            const { error: errorUpdateWashing } = await supabase
                .from('lavados')
                .update({ id_tipo_lavado: typeWashing, status:'asignado' , id_revision_prelavado: dataRevision[0].id})
                .eq('id', idWashing)

            if (errorUpdateWashing) {
                await supabase.from('prelavados_revisiones').delete().eq('id', dataRevision[0].id)
                throw new Error(`Error al asignar el tipo de lavado, error: ${errorUpdateWashing.message}`)
            }

            //actualiza el registro de los detalles de entrada
            const { error: errorUpdateRegister } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'lavado' })
                .eq('entrada_id', register.registro_detalle_entrada_id)

            if (errorUpdateRegister) {
                await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: 'programado' })
                    .eq('entrada_id', register.registro_detalle_entrada_id)
                throw new Error(`Error al actualizar registro: ${errorUpdateRegister.message}`)
            }

            //mandar cargas previas a tanques_detalles si es un tanque
            if (carga === 'tanque') {
                const { error: errorCargasPrevias } = await supabase
                    .from('tanques_detalles')
                    .update({ cargas_previas: cargasInString })
                    .eq('tanque', numero_tanque)

                if (errorCargasPrevias) {
                    throw new Error(`Error al mandar cargas previas del lavado, error ${errorCargasPrevias.message}`)
                }
            }

            if (!error & !errorUpdateRegister) {
                updater()
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Registro actualizado'
                })
            }

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const returnToPrewashing = async (id) => {

        try {
            const { error } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'prelavado' })
                .eq('id', id)

            if (error) {
                throw new Error(`Error al retornar a prelavado, error: ${error.message}`)
            }

            const { error: errorUpdateChecklist } = await supabase
                .from('prelavado_checklist')
                .update({ status: 'rechazado' })
                .eq('registro_detalle_entrada_id', id)

            if (errorUpdateChecklist) {
                throw new Error(`Error al actualizar checklist, error: ${errorUpdateChecklist.message}`)
            }

            if (!error && !errorUpdateChecklist) {
                updater()
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Registro actualizado'
                })
            }


        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }

    }

    return { sendInspectPrewashing, returnToPrewashing }


}

export { useManagmentInspection };