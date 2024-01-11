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

            //crear un nuevo registro de salida 
            const { data: outputRegister, error: errorCreateOutputRegister } = await supabase
                .from('registros')
                .insert({ user_id: session.id, type: 'salida' })
                .select()

            if (errorCreateOutputRegister) {
                throw new Error(`Error al crear el registro de salida, error: ${errorCreateOutputRegister.message}`)
            }

            const dataId = outputRegister[0].id

            //actualizar el registro de entrada a finalizado 
            const { errorRegiser } = await supabase
                .from('registros')
                .update({ status: 'finalized'})
                .eq('id', idRegistro)

            if (errorRegiser) {
                throw new Error(`Error al intentar actualizar el estatus del registro, error: ${errorRegiser.message}`)
            }
            
            //agregear registros de detalles 
            const outputDetails = dataTanques.map(async (tanque) => {
                const { data, error: errorAddDetailsOutput } = await supabase
                    .from('registros_detalles_salidas')
                    .insert({
                        registro_id: dataId,
                        carga: tanque.carga,
                        tracto: tanque.tracto,
                        numero_tanque: tanque.numero_tanque,
                        transportista_id: tanque.transportista,
                        operador_id: tanque.operador,
                    })
                if (errorAddDetailsOutput) {
                    throw new Error(`Error al crear los detalles de la salida del tanque ${errorAddDetailsOutput.message}`)
                }
            })

            try {
                await Promise.all(outputDetails);
            } catch (error) {
                throw new Error(`Error al crear detalles de salida , error: ${error.message}`)
            }

            //actualizar el estatus de los tanques 
            const updatesStatusTanques = dataTanques.map(async (tanque) => {
                const { error: errorUpdateStatusTanks } = await supabase
                    .from('tanques')
                    .update({ status: 'finalized' })
                    .eq('tanque', tanque.numero_tanque)

                if (errorUpdateStatusTanks) {
                    throw new Error(`Error al actualizar status de los tanques , error: ${errorUpdateStatusTanks.message}`)
                }
            });

            try {
                await Promise.all(updatesStatusTanques);
            } catch (error) {
                throw new Error(error.message)
            }

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