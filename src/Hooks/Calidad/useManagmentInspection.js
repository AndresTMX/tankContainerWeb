import { useContext } from "react";
import supabase from "../../supabase";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { AuthContext } from "../../Context/AuthContext";

function useManagmentInspection(updater) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { key } = useContext(AuthContext);


    const sendInspectPrewashing = async (register) => {
        try {

            const { error } = await supabase
                .from('prelavados_revisiones')
                .insert({ usuario_id:key,  ...register })

            if (error) {
                throw new Error(`Error al registrar nueva ispección de prelevado: ${error}`)
            }

            const {error: errorUpdateRegister} = await supabase
            .from('registros_detalles_entradas')
            .update({status: 'lavado'})
            .eq('registro_id', register.registro_detalle_entrada_id)

            if (errorUpdateRegister) {
                throw new Error(`Error al actualizar registro: ${errorUpdateRegister.message}`)
            }

            const {error: errorUpdatePrewashing} = await supabase
            .from('prelavado_checklist')
            .update({status: 'completado'})
            .eq('registro_detalle_entrada_id', register.registro_detalle_entrada_id )

            if (errorUpdatePrewashing) {
                throw new Error(`Error al actualizar checklist prelavado: ${errorUpdatePrewashing.message}`)
            }

            if (!error & !errorUpdateRegister & !errorUpdatePrewashing) {
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

            const {error: errorUpdateChecklist} = await supabase
            .from('prelavado_checklist')
            .update({status: 'rechazado'})
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