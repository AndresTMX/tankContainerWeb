import supabase from "../../supabase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { currenDateFormatTz } from "../../Helpers/date";

function usePostRegister() {

    const { key } = useContext(AuthContext);
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const session = JSON.parse(sessionStorage.getItem(key));
    const tableRegisters = 'registros';
    const tableInputsRegistersDetails = 'registros_detalles_entradas';
    const tableOutputsRegistersDetails = 'registros_detalles_salidas';

    /*/
    FUNCIONES PARA AGREGAR REGISTROS DE ENTRADA
    /*/

    const sendInputRegistersTank = async (data) => {

        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            });

            //crear nuevo registro general de tipo entrada
            const { data: dataRegister, error: errorCreateRegister } = await supabase
                .from(tableRegisters)
                .insert({
                    user_id: session.id,
                    type: 'entrada',
                })
                .select()

            if (errorCreateRegister) {
                throw new Error(`Error al crear registro de entrada, error: ${errorCreateRegister.message}`)
            }

            //crear nuevos detalles del registro de entrada
            const detailsRegisters = data.map(async (register) => {

                const { data: dataDetails, error: errorCreateDetails } = await supabase
                    .from(tableInputsRegistersDetails)
                    .insert({
                        entrada_id: dataRegister[0].id,
                        ...register
                    })
                    .select()

                if (errorCreateDetails) {
                    throw new Error(`Error al crear detalles del registro, error: ${errorCreateDetails.message}`)
                }


            });

            try {
                await Promise.all(detailsRegisters)
            } catch (error) {
                await supabase.from(tableRegisters).delete().eq('id', dataRegister[0].id)
                throw new Error(error.message)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            })


        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }

    }

    const sendInputRegistersPipa = async (data) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            });

            //registro de entrada general
            const { data: dataRegister, error: errorRegiser } = await supabase
                .from(tableRegisters)
                .insert({ user_id: session.id, type: 'entrada' })
                .select()

            if (errorRegiser) {
                throw new Error(`Error al crear nuevo registro, error: ${errorRegiser.message}`)
            }

            //detalles de registro
            const detailsRegisters = data.map(async (register) => {
                const { data, error: errorDetails } = await supabase
                    .from(tableInputsRegistersDetails)
                    .insert({ entrada_id: dataRegister[0].id, ...register })
                    .select()

                if (errorDetails) {
                    throw new Error(`Error al agregar los detalles al registro, error: ${errorDetails.message}`)
                }
            })

            try {
                await Promise.all(detailsRegisters)
            } catch (error) {
                await supabase.from(tableRegisters).delete().eq('id', dataRegister[0].id)
                throw new Error(error)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            })


        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const sendInputRegisterEmptyTracto = async (register) => {
        try {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

            //registro general de entrada
            const { data: dataRegister, error: errorRegister } = await supabase
                .from(tableRegisters)
                .insert({ user_id: session.id, type: 'entrada' })
                .select()

            if (errorRegister) {
                throw new Error(`Error al crear nuevo registro, error: ${errorRegister.message}`)
            }

            //detalles del registro 
            const { data, error: errorDetails } = await supabase
                .from(tableInputsRegistersDetails)
                .insert({ entrada_id: dataRegister[0].id, ...register })

            if (errorDetails) {
                await supabase.from('registros').delete().eq('id', dataRegister[0].id)
                throw new Error(`Error al crear detalles del registro, error: ${errorDetails.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            })

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    /*/
    FUNCION PARA RETORNAR TRACTO VACIO
    /*/

    const returnEmpty = async (idRegister, registros) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            });

            const tracto = registros[0].tracto;
            const idTransportista = registros[0].transportista_id;
            const idOperador = registros[0].operador_id;

            const dataOutputRegister = {
                carga: 'vacio',
                tracto: tracto,
                numero_tanque: null,
                transportista_id: idTransportista,
                operador_id: idOperador,
            }

            //actualizar el registro general a finalizado
            const { error: errorUpdateRegister } = await supabase
                .from('registros')
                .update({ status: 'finalized', checkOut: currenDateFormatTz })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar actualizar el registro`)
            }

            //Se crea un nuevo registro general de salida 
            const { data: dataRegister, error: errorAddRegister } = await supabase
                .from('registros')
                .insert({ user_id: session.id, type: 'salida' })
                .select()

            if (errorAddRegister) {
                throw new Error(`Error al agregar nuevo registro de salida, error: ${errorAddRegister.message}`)
            }

            //agregar detalles de salida 
            const { data: dataDetails, error: errorDetails } = await supabase
                .from(tableOutputsRegistersDetails)
                .insert({ entrada_id: dataRegister[0].id, ...dataOutputRegister })

            if (errorDetails) {
                throw new Error(`Error al agregar detalles al registro de salida, error: ${errorDetails.message}`)
            }

            //Si el detalle de registro es tipo vacio se actualiza el campo salida_id con el nuevo registro de salida
            const { data: dataUpdateDetails, error: errorUpdadeDetails } = await supabase
            .from(`registros_detalles_entradas`)
            .update({salida_id: dataRegister[0].id})
            .eq('entrada_id', idRegister)
            
            //de lo contrario se actualiza el estado de los demas tanques a eir
            //Filtrar los tanques asociados al registro que tengan el estatus "maniobras"
            const tanksInManiobrasState = registros.length >= 1 ?
                registros.filter((tanque) => tanque.status === 'maniobras') : []

        
            //actualizar estatus de los registros de entrada asociados 
            const registersUpdates = tanksInManiobrasState.map(async (tanque) => {
                const { error: errorUpdateRegisters } = await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: 'eir' })
                    .eq('entrada_id', idRegister)

                if (errorUpdateRegisters) {
                    throw new Error(`Error al actualizar status de los registros, error: ${errorUpdateRegisters.message}`)
                }
            })

            try {
                await Promise.all(registersUpdates);
            } catch (error) {
                throw new Error(`Error al actualizar el estatus de los registros, error: ${error.message}`)
            }


            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            });


        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }
    }

    return {
        sendInputRegisterEmptyTracto,
        sendInputRegistersTank,
        sendInputRegistersPipa,
        returnEmpty,
    }

}



export { usePostRegister };
