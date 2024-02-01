import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";
import { currenDateFormatTz } from "../../Helpers/date";

function useSealItem () {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const sealItem = async ( idWashing, seals) => {
        try {

            //actualizar status de lavado
            const { error } = await supabase
                .from('lavados')
                .update({ sellos: seals,  status: 'liberado', dateEnd: currenDateFormatTz })
                .eq('id', idWashing)

            if (error) {
                throw new Error(`Error al actualizar registro de lavado, error: ${error.message}`)
            }

        } catch (error) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: error.message
            })
        }
    }

    return { sealItem }

}

export { useSealItem };