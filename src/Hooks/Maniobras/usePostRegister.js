import supabase from "../../supabase";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"
import { GlobalContext } from "../../Context/GlobalContext";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function usePostRegister(updater) {

    const { key } = useContext(AuthContext);
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [state, dispatch] = useContext(ManiobrasContext);
    const session = JSON.parse(sessionStorage.getItem(key));
    const tableRegisters = 'registros';
    const tableInputsRegistersDetails = 'registros_detalles_entradas';
    const tableOutputsRegistersDetails = 'registros_detalles_salidas';

    const [error, setError] = useState(null)
    const [request, setRequest] = useState([])

    const updateTank = async (tanque, newStatus) => {
        const { error } = await supabase.from('tanques').update({ status: newStatus }).eq('tanque', tanque);
    }

    const addRegisterData = async (type) => {
        try {
            const { data, error } = await supabase
                .from(tableRegisters)
                .insert({ user_id: session.id, type: type, status: 'maniobras' })
                .select()
            return { data, error }
        } catch (error) {
            setError(error)
        }

    }

    const addDetailsRegisterData = async (register, idRegister, type) => {
        try {

            if (type === 'entrada' && register.numero_tanque != '') {

                const { data, error } = await supabase
                    .from(tableInputsRegistersDetails)
                    .insert(
                        {
                            registro_id: idRegister,
                            carga: register.carga,
                            tracto: register.tracto,
                            numero_tanque: register.numero_tanque,
                            numero_pipa: register.numero_pipa,
                            transportista_id: register.transportista,
                            operador_id: register.operador,
                            status: 'forconfirm'
                        })
                    .select()
            }

            if (type === 'salida' && register.numero_tanque != '') {
                const { data, error } = await supabase
                    .from(tableOutputsRegistersDetails)
                    .insert(
                        {
                            registro_id: idRegister,
                            carga: register.carga,
                            tracto: register.tracto,
                            numero_tanque: register.numero_tanque,
                            transportista_id: register.transportista,
                            operador_id: register.operador,
                        })
                    .select()
            }

            if (type === 'vacio') {
                const { data, error } = await supabase
                    .from(tableInputsRegistersDetails)
                    .insert(
                        {
                            registro_id: idRegister,
                            carga: register.carga,
                            tracto: register.tracto,
                            numero_tanque: null,
                            transportista_id: register.transportista,
                            operador_id: register.operador,
                            status: 'empty'
                        })
                    .select()
            }
        } catch (error) {
            setError(error)
        }
    }

    const updateStatusRegisters = async (idInputRegister, newStatus) => {
        const { data, error } = await supabase
            .from(tableInputsRegistersDetails)
            .update({ status: newStatus })
            .eq('id', idInputRegister)
            .select()
        if (!error) {
            console.log(data)
        } else {
            console.log(error)
        }
    }

    const sendInputRegistersTank = async (data) => {

        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            });

            //crear nuevo registro general
            const { data: dataRegister, error: errorCreateRegister } = await supabase
                .from(tableRegisters)
                .insert({
                    user_id: session.id,
                    type: 'entrada',
                    status: 'maniobras'
                })
                .select()

            if (errorCreateRegister) {
                throw new Error(`Error al crear registro de entrada`)
            }

            //crear nuevos detalles del registro
            const detailsRegisters = data.map(async (register) => {
                const { data, error: errorCreateDetails } = await supabase
                    .from(tableInputsRegistersDetails)
                    .insert({
                        registro_id: dataRegister[0].id,
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

            //actualizar estatus de los tanques asociados al registro
            const updatesStatusTanks = data.map(async (register) => {
                const { error: errorUpdateTanks } = await supabase
                    .from('tanques')
                    .update({ status: 'forconfirm' })
                    .eq('tanque', register.numero_tanque)

                if (errorUpdateTanks) {
                    throw new Error(`Error al actualizar estatus de los tanques, error: ${errorUpdateTanks.message}`)
                }
            });

            try {
                await Promise.all(updatesStatusTanks);
            } catch (error) {
                throw new Error(`Error al actualizar estatus de los tanques, error: ${error.message}`)
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

            const { data: dataRegister, error: errorRegiser } = await supabase
                .from(tableRegisters)
                .insert({ user_id: session.id, type: 'entrada', status: 'maniobras' })
                .select()

            if (errorRegiser) {
                throw new Error(`Error al crear nuevo registro, error: ${errorRegiser.message}`)
            }

            const detailsRegisters = data.map(async (register) => {
                const { data, error: errorDetails } = await supabase
                    .from(tableInputsRegistersDetails)
                    .insert({ registro_id: dataRegister[0].id, ...register })
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


            const { data: dataRegister, error: errorRegister } = await supabase
                .from(tableRegisters)
                .insert({ user_id: session.id, type: 'entrada', status: 'maniobras' })
                .select()

            if (errorRegister) {
                throw new Error(`Error al crear nuevo registro, error: ${errorRegister.message}`)
            }

            const { data, error: errorDetails } = await supabase
                .from(tableInputsRegistersDetails)
                .insert({ registro_id: dataRegister[0].id, ...register })

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

    const sendOutputRegisters = async (idRegistro, data, newStatus) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        try {
            const { error } = await supabase.from('registros').update({ status: 'finish' }).eq('id', idRegistro)

            if (error) {
                throw new Error('Error al intentar actualizar el estatus del registro')
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al intentar actualizar el estatus del registro'
            })
        }

        const registerData = await addRegisterData('salida');

        const outputRegisters = data.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id, 'salida');
            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                setError(error);
            }
        });

        try {
            await Promise.all(outputRegisters);
        } catch (error) {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            setError(error);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al intentar actualizar el estatus del registro'
            })
        }


    };

    const sendOutputTankRegisters = async (data) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const updatesStatusRegister = data.map(async (item) => {
            try {
                await updateStatusRegisters(item.id, 'finish')
            } catch (error) {
                setError(error);
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al mapear actualizaciones de los registros de tanques' });
            }
        });

        try {
            await Promise.all(updatesStatusRegister);
        } catch (error) {
            setError(error);
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al enviar actualizaciones de los registros de tanques' });
        }

        const updatesStatusTanques = data.map(async (item) => {
            try {
                await updateTank(item.numero_tanque, 'onroute')
            } catch (error) {
                setError(error);
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al mapear actualizaciones de los status de tanques' });
            }
        })

        try {
            await Promise.all(updatesStatusTanques);
        } catch (error) {
            setError(error);
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al enviar actualizaciones de los status de tanques' });
        }


        const outpusRegister = await addRegisterData('salida');
        const idOutputRegister = outpusRegister[0].id;

        const addOutputDetails = data.map(async (item) => {
            try {
                const outputDetail = await addDetailsRegisterData(item, idOutputRegister, 'salida')
            } catch (error) {
                setError(error);
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al enviar el registro de salida' });
            }
        })

        try {
            await Promise.all(addOutputDetails);
        } catch (error) {
            setError(error);
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al enviar el registro de salida' });
        }

        dispatchGlobal({ type: actionTypes.setTypeRegister, payload: 'salida' });
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
        dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Registros actualizados' });


    }

    const sendOutputTractoEmpty = async (data) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        const { errorRegiser } = await supabase.from('registros').update({ status: 'finish' }).eq('id', data.id)

        const dataOutputRegister = {
            carga: 'vacio',
            tracto: data.registros_detalles_entradas[0].tracto,
            numero_tanque: null,
            transportista: data.registros_detalles_entradas[0].transportistas.id,
            operador: data.registros_detalles_entradas[0].operadores.id
        }

        try {
            const dataRegister = await addRegisterData('salida');
            const detailsRegister = await addDetailsRegisterData(dataOutputRegister, dataRegister[0].id, 'salida');
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Ocurrio un error al intentar subir registro de salida'
            });
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
        }

        dispatch({
            type: actionTypes.setSelectOutputRegister,
            payload: []
        })


        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });

        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registro enviado'
        });


    }

    const sendOutputPipaRegister = async (data) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const updatesStatusRegisters = data.map(async (item) => {
            try {
                await updateStatusRegisters(item.id, 'finish');
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                });
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al actualizar el status del registro'
                });
            }
        })

        try {
            Promise.all(updatesStatusRegisters)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar el status del registro'
            });
        }

        const dataRegister = await addRegisterData('salida');

        const registersDetails = data.map(async (item) => {
            try {
                await addDetailsRegisterData(item, dataRegister[0].id, 'salida')
            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            }
        })

        try {
            Promise.all(registersDetails);
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al crear los detalles del registro'
            });
        }

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });
        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registros actualizados'
        });

    }

    const returnEmpty = async (data) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            });

            const idRegister = data.id;
            const tracto = data.registros_detalles_entradas[0].tracto;
            const idTransportista = data.registros_detalles_entradas[0].transportistas.id;
            const idOperador = data.registros_detalles_entradas[0].operadores.id;
            const registros = data.registros_detalles_entradas;

            //actualizar el registro general a finalizado
            const { error: errorUpdateRegister } = await supabase
                .from('registros')
                .update({ status: 'finish' })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar actualizar el registro`)
            }

            const dataOutputRegister = {
                carga: 'vacio',
                tracto: tracto,
                numero_tanque: null,
                transportista_id: idTransportista,
                operador_id: idOperador,
                status: 'forconfirm'
            }

            //Se agrega un nuevo registro general de salida 
            const { data: dataRegister, error: errorAddRegister } = await supabase
                .from('registros')
                .insert({ user_id: session.id, type: 'salida', status: 'forconfirm' })
                .select()

            if (errorAddRegister) {
                throw new Error(`Error al agregar nuevo registro de salida, error: ${errorAddRegister.message}`)
            }

            //agregar detalles de salida 
            const { data: dataDetails, error: errorDetails } = await supabase
                .from(tableOutputsRegistersDetails)
                .insert({ registro_id: dataRegister[0].id, ...dataOutputRegister })

            if (errorDetails) {
                throw new Error(`Error al agregar detalles al registro de salida, error: ${errorDetails.message}`)
            }

            //Filtrar los tanques asociados al registro que tengan el estatus "maniobras"
            const tanksInManiobrasState = registros.length >= 1 ?
                registros.filter((tanque) => tanque.status === 'maniobras') : []

            //actualizar estos tanques al estatus "eir"
            const tanquesUpdates = tanksInManiobrasState.map(async (tanque) => {
                const { error: errorUpdateStatusTanks } = await supabase
                    .from('tanques')
                    .update({ status: 'eir' })
                    .eq('tanque', tanque.numero_tanque)

                if (errorUpdateStatusTanks) {
                    throw new Error(`Error al actualizar estatus de tanques, error: ${errorUpdateStatusTanks.message}`)
                }

            })

            try {
                await Promise.all(tanquesUpdates);
            } catch (error) {
                throw new Error(`Error al actualizar status de tanques, error: ${error.message}`)
            }

            //actualizar estatus de los registros de entrada asociados 
            const registersUpdates = tanksInManiobrasState.map(async (tanque) => {
                const { error: errorUpdateRegisters } = await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: 'eir' })
                    .eq('registro_id', idRegister)

                if (errorUpdateRegisters) {
                    throw new Error(`Error al actualizar status de los registros, error: ${errorUpdateRegisters.message}`)
                }
            })

            try {
                await Promise.all(registersUpdates);
            } catch (error) {
                throw new Error(`Error al actualizar el estatus de los registros, error: ${error.message}`)
            }

            updater();


            dispatch({
                type: actionTypes.setSelectOutputRegister,
                payload: []
            })


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
        sendOutputRegisters,
        updateStatusRegisters,
        sendOutputTankRegisters,
        sendOutputTractoEmpty,
        sendOutputPipaRegister,
        returnEmpty,
    }

}



export { usePostRegister };
