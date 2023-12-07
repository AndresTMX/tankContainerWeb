import supabase from "../../supabase";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"
import { GlobalContext } from "../../Context/GlobalContext";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function usePostRegister() {

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
                .insert({ user_id: session.id, type: type })
                .select()
            return data
        } catch (error) {
            console.log(error)
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

        const tracto = data[0].numero_tanque;
        const { error } = await supabase.from('tractos').update({ status: 'forconfirm' }).eq('tracto', tracto);

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

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });
        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registro enviado'
        })

    }

    const sendInputRegistersPipa = async (data) => {
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const { error } = await supabase.from('tractos').update({ status: 'forconfirm' }).eq('tracto', data.tracto);

        if (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar el estado del tractocamion'
            })
        }

        const registerData = await addRegisterData('entrada');
        const detailsRegister = await addDetailsRegisterData(data, registerData[0].id, 'entrada');

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });
        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registro enviado'
        })


    }

    const sendInputRegisterEmptyTracto = async (data) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const { error } = await supabase.from('tractos').update({ status: 'forconfirm' }).eq('tracto', data.tracto);

        if (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar el estado del tractocamion'
            })
        }

        const registerData = await addRegisterData('entrada');
        const detailsRegister = await addDetailsRegisterData(data, registerData[0].id, 'vacio');

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });
        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Registro enviado'
        })
    }

    const sendOutputRegisters = async (data, newStatus) => {
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const updateStatus = data.map(async (item) => {
            try {
                await updateStatusRegisters(item.id, newStatus)
            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            }
        });

        const { error } = await supabase.from('tractos').update({ status: 'onroute' }).eq('tracto', data[0].tracto)

        try {
            await Promise.all(updateStatus);
        } catch (error) {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            setError(error);
        }

        const registerData = await addRegisterData('salida');

        try {

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
                setTimeout(() => {
                    dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                    dispatch({ type: actionTypes.setTypeRegister, payload: 'salida' })
                }, 2000)

            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                setError(error);
            }
        } catch (error) {
            dispatch({ type: actionTypesGlobal.setLoading, payload: false });
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

        try {
            const tracto = data[0].tracto;
            const { error } = await supabase.from('tractos').update({ status: 'onroute' }).eq('tracto', tracto);

            if (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
                dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Error al intentar actualizar el status del tranctocamion' });
            }
        } catch (error) {
            setError(error)
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
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

        try {
            const dataRegister = await addRegisterData('salida');
            const detailsRegister = await addDetailsRegisterData(data, dataRegister[0].id, 'salida');
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

        try {
            const tracto = data.tracto;
            const { error } = await supabase.from('tractos')
                .update({ status: 'onroute' })
                .eq('tracto', tracto);

            if (!error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Registro enviado con exito'
                });

                dispatch({
                    type: actionTypes.setTypeRegister,
                    payload: 'salida'
                })

                dispatch({
                    type: actionTypes.setModalRegister,
                    payload: false
                })
            }

            if (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                });
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al intentar actualizar el status del tranctocamion'
                });
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                });
            }
        } catch (error) {
            setError(error)
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
            type: actionTypes.setTypeRegister,
            payload: 'salida'
        });

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

        try {
            const { error } = await supabase.from('tractos')
                .update({ status: 'onroute' })
                .eq('tracto', data[0].tracto)
            if (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'Error al actualizar el estado del tractocamion'
                });
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Error al actualizar el estado del tractocamion'
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


    return {
        sendInputRegisterEmptyTracto,
        sendInputRegistersTank,
        sendInputRegistersPipa,
        sendOutputRegisters,
        updateStatusRegisters,
        sendOutputTankRegisters,
        sendOutputTractoEmpty,
        sendOutputPipaRegister,
    }

}



export { usePostRegister };
