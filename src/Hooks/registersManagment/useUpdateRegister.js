import { useContext } from "react";
import supabase from "../../supabase";
import { currenDateFormatTz } from "../../Helpers/date";
//context
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function useUpdateRegister() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext)

    const checkRegisterWhitId = async (idRegister, newStatus, data) => {

        const registros = data.registros_detalles_entradas;

        const { errorUpdateRegister } = await supabase.from('registros')
            .update({ checkIn: currenDateFormatTz })
            .eq('id', idRegister)

        if (errorUpdateRegister) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al intentar confirmar la entrada del registro'
            })
        }

        if (registros[0].carga === 'tanque') {
            const updatesStatusTanks = registros.map(async (register) => {
                try {
                    await supabase.from('tanques')
                        .update({ status: 'maniobras' })
                        .eq('tanque', register.numero_tanque)
                } catch (error) {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: 'Error al intentar confirmar la entrada del registro'
                    })
                }
            })

            try {
                await Promise.all(updatesStatusTanks)
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al intentar confirmar la entrada del registro'
                })
            }
        }


        if (!errorUpdateRegister) {

            const { errorUpdateStatus } = await supabase.from('registros_detalles_entradas')
                .update({ status: newStatus })
                .eq('registro_id', idRegister)

            dispatch({
                type: actionTypes.setUpdate,
                payload: !state.update
            })

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro actualizado'
            })
        }
    }

    const checkOutRegisterWhitId = async (idRegister, newStatus, data) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        })

        const registros = data.registros_detalles_salidas;

        const { errorUpdateRegister } = await supabase.from('registros')
            .update({ checkIn: currenDateFormatTz, status: newStatus })
            .eq('id', idRegister)

        if (errorUpdateRegister) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al intentar confirmar la entrada del registro'
            })
        }

        if (registros[0].carga === 'tanque') {
            const updatesStatusTanks = registros.map(async (register) => {
                try {
                    await supabase.from('tanques')
                        .update({ status: newStatus })
                        .eq('tanque', register.numero_tanque)
                } catch (error) {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: 'Error al intentar confirmar la entrada del registro'
                    })
                }
            })

            try {
                await Promise.all(updatesStatusTanks)
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al intentar confirmar la entrada del registro'
                })
            }
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro actualizado'
            })
        }, 1200)

    }

    return { checkRegisterWhitId, checkOutRegisterWhitId }
}


export { useUpdateRegister };