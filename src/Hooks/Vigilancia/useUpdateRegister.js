import { useContext } from "react";
import supabase from "../../supabase";
import { currenDateFormatTz } from "../../Helpers/date";
//context
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useUpdateRegister(updater) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const checkRegisterWhitId = async (idRegister, newStatus, data) => {
        try {

            const registros = data.registros_detalles_entradas;
            const carga = registros[0].carga;

            //actualizar registros para confirmar la entrada
            const { error: errorUpdateRegister } = await supabase.from('registros')
                .update({ checkIn: currenDateFormatTz })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
            }

            //si la carga es tanque se actualizan los estatus de los tanques
            if (carga === 'tanque') {
                const updatesStatusTanks = registros.map(async (register) => {

                    const { error: errorUpdateTanks } = await supabase.from('tanques')
                        .update({ status: 'maniobras' })
                        .eq('tanque', register.numero_tanque)

                    if (errorUpdateTanks) {
                        throw new Error(`Error al intentar actualizar los tanques , error: ${errorUpdateTanks.message}`)
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

            //si la carga es una pipa solo se actualiza el registro de entrada
            const { error: errorUpdateStatus } = await supabase.from('registros_detalles_entradas')
                .update({ status: newStatus })
                .eq('registro_id', idRegister)

            if (errorUpdateStatus) {
                throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
            }


            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro actualizado'
            })

            updater();
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const checkOutRegisterWhitId = async (idRegister, newStatus, data) => {
        try {

            const registros = data.registros_detalles_salidas;
            const carga = registros[0].carga;

            //actualizar registros para confirmar la salida
            const { error: errorUpdateRegister } = await supabase.from('registros')
                .update({ checkIn: currenDateFormatTz, status: newStatus })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
            }

            //si la carga es tanque se actualizan los estatus de los tanques
            if (carga === 'tanque') {
                const updatesStatusTanks = registros.map(async (register) => {

                    const { error: errorUpdateStatusTanks } = await supabase.from('tanques')
                        .update({ status: newStatus })
                        .eq('tanque', register.numero_tanque)

                    if (errorUpdateStatusTanks) {
                        throw new Error(`Error al actualizar los estatus de los tanques, error: ${errorUpdateRegister.message}`)
                    }

                })

                try {
                    await Promise.all(updatesStatusTanks)
                } catch (error) {
                    throw new Error(`Error al actualizar los estatus de los tanques, error: ${error.message}`)
                }
            }

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro actualizado'
            })

            updater()
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    return { checkRegisterWhitId, checkOutRegisterWhitId }
}


export { useUpdateRegister };