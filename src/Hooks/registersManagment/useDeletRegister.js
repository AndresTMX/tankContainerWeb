import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function useDeletRegister() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext);


    const deletRegister = async (idRegister) => {

        const { error } = await supabase.from('registros')
            .delete()
            .eq('id', idRegister);

        return error
    }

    const deleteRegisterTank = async (data) => {

        const arrayDetails = data.registros_detalles_entradas;

        const updateTanques = arrayDetails.map(async (item) => {
            try {
                await supabase.from('tanques')
                    .update({ status: 'parked' })
                    .eq('tanque', item.numero_tanque)
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al intentar actualizar los estatus de tanques'
                })
            }

        })

        try {
            Promise.all(updateTanques)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar los estatus de tanques'
            })
        }


        try {
            deletRegister(data.id)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al eliminar el registro'
            })
        }

        dispatch({
            type: actionTypes.setUpdate,
            payload: !state.update
        })

        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registro eliminado'
        })


    }

    const deleteRegisterPipa = async (data) => {
       
        try {
            deletRegister(data.id)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al eliminar el registro'
            })
        }

        dispatch({
            type: actionTypes.setUpdate,
            payload: !state.update
        })

        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registro eliminado'
        })
    }

    const deleteRegisterEmpty = async (data) => {
        const { error } = await supabase.from('registros')
            .delete()
            .eq('id', data.id);

        if (!error) {
            dispatch({
                type: actionTypes.setUpdate,
                payload: !state.update
            })

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro eliminado'
            })
        }
    }

    const routerDelet = async (typeChargue, data) => {

        const router = {
            tanque: () => deleteRegisterTank(data),
            pipa: () => deleteRegisterPipa(data),
            vacio: () => deleteRegisterEmpty(data),
        }

        if (router[typeChargue]) {
            router[typeChargue]();
        }

    }

    return { routerDelet }
}

export { useDeletRegister };