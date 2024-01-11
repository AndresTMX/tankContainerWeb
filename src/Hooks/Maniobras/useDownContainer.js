import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useDownContainer(updater) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const downContainerToManiobra = async (idRegisterDetail) => {

        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            //actualizar detalles de registros
            const { error: errorDetails } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'eir' })
                .eq('id', idRegisterDetail)

            if (errorDetails) {
                throw new Error(`Error al actualizar los detalles del registro, error: ${errorDetails.message}`)
            }

            setTimeout(() => {
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: `Tanque bajado a maniobras`
                })
                updater()
            }, 1200)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }

    }

    return { downContainerToManiobra }

}

export { useDownContainer };