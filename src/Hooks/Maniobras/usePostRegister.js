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

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });


        if (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar el estado del tractocamion'
            })
        }

        const registerData = await addRegisterData('entrada');

        const detailsRegisters = data.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id, 'entrada');
            } catch (error) {
                setError(error);
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al crear los detalles del registro'
                })
            }
        });

        try {
            Promise.all(detailsRegisters)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al subir los detalles del registro'
            })
        }

        const updatesStatusTanks = data.map(async (register) => {
            try {
                await updateTank(register.numero_tanque, 'forconfirm');
            } catch (error) {
                setError(error);
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al crear los detalles del registro'
                })
            }
        });

        try {
            Promise.all(updatesStatusTanks);
        } catch (error) {
            setError(error);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al crear los detalles del registro'
            })
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            })
        }, 1200)

    }

    const sendInputRegistersPipa = async (data) => {
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const registerData = await addRegisterData('entrada');
        const detailsRegisters = data.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id, 'entrada');
            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al actualizar el estado del tractocamion'
                })
            }
        })

        try {
            Promise.all(detailsRegisters)
        } catch (error) {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar el estado del tractocamion'
            })
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            })
        }, 1200)


    }

    const sendInputRegisterEmptyTracto = async (data) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });


        const registerData = await addRegisterData('entrada');
        const detailsRegister = await addDetailsRegisterData(data, registerData[0].id, 'vacio');

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro enviado'
            })
        }, 1200)
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
                transportista: idTransportista,
                operador: idOperador,
                status: 'forconfirm'
            }

            // try {
            //     const dataRegister = await addRegisterData('salida');
            //     const detailsRegister = await addDetailsRegisterData(dataOutputRegister, dataRegister[0].id, 'salida');
            // } catch (error) {
            //     dispatchGlobal({
            //         type: actionTypesGlobal.setNotification,
            //         payload: 'Ocurrio un error al intentar subir registro de salida'
            //     });
            //     dispatchGlobal({
            //         type: actionTypesGlobal.setLoading,
            //         payload: false
            //     });
            // }

            //Se agrega un nuevo registro general de salida 
            const { data: dataRegister, error: errorAddRegister } = await supabase
                .from('registros')
                .insert({ user_id: session.id, type: 'salida', status: 'maniobras' })
                .select()

            if (errorAddRegister) {
                throw new Error(`Error al agregar nuevo registro de salida, error: ${errorAddRegister.message}`)
            }

            const { data: dataDetails, error: errorDetails } = await supabase
                .from(tableOutputsRegistersDetails)
                .insert(
                    {
                        registro_id: idRegister,
                        carga: dataDetails.carga,
                        tracto: dataDetails.tracto,
                        numero_tanque: dataDetails.numero_tanque,
                        transportista_id: dataDetails.transportista,
                        operador_id: dataDetails.operador,
                    })
                .select()

            if (errorDetails) {
                throw new Error(`Error al agregar detalles al registro de salida, error: ${errorDetails.message}`)
            }

            const tanksInManiobrasState = data.registros_detalles_entradas.length >= 1 ?
                data.registros_detalles_entradas.filter((tanque) => tanque.status === 'maniobras') : []


            const tanquesUpdates = tanksInManiobrasState.map(async (tanque) => {
                const { error } = await supabase.from('tanques').update({ status: 'eir' }).eq('tanque', tanque.numero_tanque)
            })

            await Promise.all(tanquesUpdates);

            const registersUpdates = tanksInManiobrasState.map(async (tanque) => {
                const { error } = await supabase.from('registros_detalles_entradas').update({ status: 'eir' }).eq('registro_id', data.id)
            })

            await Promise.all(registersUpdates);


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
