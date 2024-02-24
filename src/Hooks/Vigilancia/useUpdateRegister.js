import dayjs from "dayjs";
import { useContext } from "react";
import supabase from "../../supabase";
//context
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useUpdateRegister(updater) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const checkRegisterWhitId = async (idRegister, data) => {
        try {

            const currentDate = new dayjs(new Date()).utc();

            const detalles = data;
            //actualizar registros para confirmar la entrada
            const { error: errorUpdateRegister } = await supabase.from('registros')
                .update({ checkIn: currentDate, status: 'confirm' })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
            }

            //verificar existencia de los tanques en la base y aumentar los reingresos de ser necesario
            const updateReingresos = detalles.map(async (registro) => {

                const numero_carga = registro.numero_tanque || registro.numero_pipa;

                const { data: dataRepeat, error: errorRepeat } = await supabase
                    .from('tanques_detalles')
                    .select('tanque, reingresos')
                    .eq('tanque', numero_carga)

                if (errorRepeat) {
                    throw new Error(`Error al consultar repeticion, error: ${errorRepeat.message}`)
                }

                //si no hay tanques registrados con ese numero de tanque crear registro
                if (dataRepeat.length === 0) {
                    const { data: dataDetailTank, error: errorAddDetailTank } = await supabase
                        .from('tanques_detalles')
                        .insert({ tanque: numero_carga, tipo: registro.tipo || 'pipa' })
                        .select()

                    if (errorAddDetailTank) {
                        throw new Error(`Error al crear detalles del tanque, error: ${errorAddDetailTank.message}`)
                    }
                } else {
                    const { error: errorUpdateReingreso } = await supabase
                        .from('tanques_detalles')
                        .update({ reingresos: dataRepeat[0].reingresos + 1 })
                        .eq('tanque', registro.numero_carga)

                    if (errorUpdateReingreso) {
                        throw new Error(`Error al generar reingreso, error: ${errorUpdateReingreso.message}`)
                    }
                }


            })

            try {
                await Promise.all(updateReingresos)
            } catch (error) {
                throw new Error(`Error al actualizar reingresos, error: ${error.message}`)
            }


            //actualiza el registro de entrada
            const { error: errorUpdateStatus } = await supabase.from('registros_detalles_entradas')
                .update({ status: 'maniobras' })
                .eq('entrada_id', idRegister)

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

    const checkOutRegisterWhitId = async (idRegister, data) => {
        try {

            const currentDate = new dayjs(new Date()).utc();

            //actualizar registros para confirmar la salida
            const { error: errorUpdateRegister } = await supabase.from('registros')
                .update({ checkOut: currentDate, status: 'finalizado' })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
            }

            //actualizar los detalles del registro de entrada
            const { error: errorUpdateStatusInput } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'finalizado' })
                .eq('entrada_id', idRegister)

            if (errorUpdateStatusInput) {
                throw new Error(`Error al actualizar el estatus del registro de entrada, error:${errorUpdateStatusInput.message}`)
            }

            //actualizar los detalles del registro de salida
            const { error: errorUpdateStatus } = await supabase
                .from('registros_detalles_salidas')
                .update({ status: 'confirmado' })
                .eq('salida_id', idRegister)

            if (errorUpdateStatus) {
                throw new Error(`Error al actualizar el estatus del registro de salida, error:${errorUpdateStatus.message}`)
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