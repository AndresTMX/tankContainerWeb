import { useContext } from "react";
import supabase from "../../supabase";
import { AuthContext } from "../../Context/AuthContext";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useAddOutputManiobra() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { key } = useContext(AuthContext);
    const session = JSON.parse(sessionStorage.getItem(key));


    const addOutputRegisterForManiobra = async (idRegistro, dataTanques) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        try {
            const { errorRegiser } = await supabase.from('registros').update({ status: 'finish' }).eq('id', idRegistro)

            if (errorRegiser) {
                throw new Error('Error al intentar actualizar el estatus del registro')
            }
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

        const { data, error } = await supabase
            .from('registros')
            .insert({ user_id: session.id, type: 'salida', status: 'forconfirm' })
            .select()

        if (error) {
            throw new Error('Error al crear el registro de salida')
        }

        const dataId = data[0].id

        try {

            const outputDetails = dataTanques.map(async (tanque) => {
                const { data, error } = await supabase
                    .from('registros_detalles_salidas')
                    .insert({
                        registro_id: dataId,
                        carga: tanque.carga,
                        tracto: tanque.tracto,
                        numero_tanque: tanque.numero_tanque,
                        transportista_id: tanque.transportista,
                        operador_id: tanque.operador,
                        status:'forconfirm'
                    })
                if (error) {
                    throw new Error(`Error al crear los detalles de la salida del tanque`)
                }
            })

            await Promise.all(outputDetails);

            const updatesStatusTanques = dataTanques.map(async (tanque) => {
                const { error } = await supabase.from('tanques').update({ status: 'forconfirm' }).eq('tanque', tanque.numero_tanque)

                if (error) {
                    throw new Error(`Error al actualizar status de los tanques`)
                }
            });

            await Promise.all(updatesStatusTanques);

            setTimeout(() => {
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Salida generada con exito'
                })
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


    return { addOutputRegisterForManiobra }

}

export { useAddOutputManiobra };