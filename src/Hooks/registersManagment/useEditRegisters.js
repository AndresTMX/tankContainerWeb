import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext"
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useEditRegisters() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext);

    const editRegister = async (idRegister, data, updates) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        const registros = data.registros_detalles_entradas;

        const updateDetailsRegisters = registros.map(async (item) => {
            try {
                await supabase.from('registros_detalles_entradas')
                    .update({
                        tracto: updates.tracto,
                        operador_id: updates.operador,
                        transportista_id: updates.transportista,
                        numero_pipa: updates.pipa
                    })
                    .eq('registro_id', idRegister)
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al intentar cargar actualizaciones'
                })
            }
        })

        try {
           await Promise.all(updateDetailsRegisters);
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al cargar actualizaciones'
            })
        }

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });

    }



    return { editRegister }
}

export { useEditRegisters };