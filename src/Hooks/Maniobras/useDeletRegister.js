import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useDeletRegister(updaterRegisters) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const deleteRegisterTank = async (idRegister, details) => {

        try {

            //actualizar los tanques con el estatus ready 
            const updateTanques = details.map(async (item) => {
                const { error: errorUpdateTanques } = await supabase
                    .from('tanques')
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
            const { error: errorDeleteRegister } = await supabase
                .from('registros')
                .delete()
                .eq('id', idRegister);

            if (errorDeleteRegister) {
                throw new Error(`Error al intentar actualizar los estatus de tanques, error: ${errorDeleteRegister.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro eliminado'
            })

            updaterRegisters()

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }




    }

    const deleteRegisterPipa = async (idRegister) => {
        try {

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

            updaterRegisters()
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const deleteRegisterEmpty = async (idRegister) => {
        try {

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

            updaterRegisters()
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const routerDelet = async (typeChargue, idRegister, details) => {

        const router = {
            tanque: () => deleteRegisterTank(idRegister, details),
            pipa: () => deleteRegisterPipa(idRegister),
            vacio: () => deleteRegisterEmpty(idRegister),
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