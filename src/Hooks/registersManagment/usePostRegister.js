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

            const status = register.carga === 'Pipa' ? 'prelavado' : 'parked';

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
            console.log(error)
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

    const sendRegisters = async (data, type) => {

        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true })
        const registerData = await addRegisterData(type);
        const promises = data.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id, type);
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

    const sendOutputRegisters = async (data) => {
        dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true });

        const updateStatus = data.map(async (item) => {
            try {
                await updateStatusRegisters(item.id, 'maniobras')
            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false });
            }
        });

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


    return { sendRegisters, sendOutputRegisters, updateStatusRegisters }

}



export { usePostRegister };
