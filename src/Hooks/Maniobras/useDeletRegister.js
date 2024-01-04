import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useDeletRegister(updater) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const deleteRegisterTank = async (data) => {

        try {
            const arrayDetails = data.registros_detalles_entradas;
            const idRegister = data.id;

            //actualizar los tanques con el estatus ready 
            const updateTanques = arrayDetails.map(async (item) => {
                const { error: errorUpdateTanques } = await supabase.from('tanques')
                    .update({ status: 'ready' })
                    .eq('tanque', item.numero_tanque)

                if (errorUpdateTanques) {
                    throw new Error(`Error al intentar actualizar los estatus de tanques, error: ${errorUpdateTanques.message}`)
                }

            });

            //resolver todas las promesas de actualizacion
            try {
                Promise.all(updateTanques)
            } catch (error) {
                throw new Error(`Error al intentar actualizar los estatus de tanques, error: ${error.message}`)
            }

            //eliminar el registro de la tabla principal
            const { error: errorDeleteRegister } = await supabase.from('registros')
                .delete()
                .eq('id', idRegister);

            if (errorDeleteRegister) {
                throw new Error(`Error al intentar actualizar los estatus de tanques, error: ${errorDeleteRegister.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro eliminado'
            })

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }




    }

    const deleteRegisterPipa = async (data) => {
        try {

            const idRegister = data.id;

            //eliminar el registro 
            const { error: errorDeleteRegister } = await supabase
                .from('registros')
                .delete()
                .eq('id', idRegister)

            if (errorDeleteRegister) {
                throw new Error(`Error al eliminar el registro ${errorDeleteRegister.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro eliminado'
            })

            updater()
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const deleteRegisterEmpty = async (data) => {
        try {

            const idRegister = data.id;

            const { error } = await supabase.from('registros')
                .delete()
                .eq('id', idRegister)

            if (error) {
                throw new Error(`Error al intentar eliminar registro de tracto vacio, error: ${error.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro eliminado'
            })

            updater()
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const routerDelet = async (typeChargue, data) => {

        const router = {
            tanque: () => deleteRegisterTank(data),
            pipa: () => deleteRegisterPipa(data),
            vacio: () => deleteRegisterEmpty(data),
        }

        try {
            if (router[typeChargue]) {
                router[typeChargue]();
            } else {
                throw new Error(`Error al eliminar el registro, registro de tipo desconocido , error: ${error.message}`)
            }

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    return { routerDelet }
}

export { useDeletRegister };