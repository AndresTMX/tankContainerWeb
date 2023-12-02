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

    const addOutputRegister = async (idRegister, register) => {

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

    const addDetailsRegisterData = async (register, idRegister, type, newStatusTracto, idTracto) => {
        try {

            const status = register.carga === 'Pipa' ? 'prelavado' : 'maniobras';

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
                            status: status
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
        } catch (error) {
            setError(error)
        }
    }

    const addOutputRegisterDetails = async (idRegister, register) => {
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

    const sendRegisters = async (data, type) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true })
        const registerData = await addRegisterData(type);
        const promises = data.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id, type, 'onroute', register.tracto);
            } catch (error) {
                setError(error);
            }
        });

        try {
            await Promise.all(promises);
        } catch (error) {
            dispatch({ type: actionTypesGlobal.setLoading, payload: false })
            console.error(error);
            setError(error);
        }
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })

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
                const outputDetail = await addOutputRegisterDetails(idOutputRegister, item)
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

        setTimeout(() => {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Registros actualizados' });
        }, 1000)

    }

    const sendOutputTankEmpty = async (data) => {
        try {
            const tracto = data[0].tracto;
            const { error } = await supabase.from('tractos').update({ status: 'onroute' }).eq('tracto', tracto);

            if (error) {
                dispatchGlobal({ 
                    type: actionTypesGlobal.setLoading, 
                    payload: false });
                dispatchGlobal({ 
                    type: actionTypesGlobal.setNotification, 
                    payload: 'Error al intentar actualizar el status del tranctocamion' });
            }
        } catch (error) {
            setError(error)
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
        }
    }


    return { sendRegisters, sendOutputRegisters, updateStatusRegisters, sendOutputTankRegisters }

}



export { usePostRegister };
