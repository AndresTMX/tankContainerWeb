import supabase from "../../supabase";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/"
import { DevelopmentContext } from "../../Context";
import { actionTypes } from "../../Reducers";

function usePostRegister() {
    
    const { key } = useContext(AuthContext);
    const [state, dispatch] = useContext(DevelopmentContext);
    const session = JSON.parse(sessionStorage.getItem(key));
    const { loading , typeRegister} = state;

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
            if (type === 'entrada') {
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
                        })
                    .select()
            }

            if (type === 'salida') {
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

    const sendRegisters = async (data, type) => {
        dispatch({ type: actionTypes.setLoading, payload: true })
        const registerData = await addRegisterData(type);
        const dataValues = Object.values(data);
        const promises = dataValues.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id, type);
            } catch (error) {
                setError(error);
            }
        });

        try {
            await Promise.all(promises);
        } catch (error) {
            dispatch({ type: actionTypes.setLoading, payload: false })
            console.error(error);
            setError(error);
        }
        dispatch({ type: actionTypes.setLoading, payload: false })

    }

    const updateStatusRegisters = async (idInputRegister) => {
        const { data, error } = await supabase
            .from(tableInputsRegistersDetails)
            .update({ status: 'full' })
            .eq('id', idInputRegister)
            .select()
        if (!error) {
            console.log(data)
        } else {
            console.log(error)
        }
    }

    const sendOutputRegisters = async (data) => {
        dispatch({ type: actionTypes.setLoading, payload: true });

        const updateStatus = data.map(async (item) => {
            try {
                await updateStatusRegisters(item.id)
            } catch (error) {
                dispatch({ type: actionTypes.setLoading, payload: false });
            }
        });

        try {
            await Promise.all(updateStatus);
        } catch (error) {
            dispatch({ type: actionTypes.setLoading, payload: false });
            setError(error);
        }

        const registerData = await addRegisterData('salida');

        try {

            const outputRegisters = data.map(async (register) => {
                try {
                    await addDetailsRegisterData(register, registerData[0].id, 'salida');
                } catch (error) {
                    dispatch({ type: actionTypes.setLoading, payload: false });
                    setError(error);
                }
            });

            try {
                await Promise.all(outputRegisters);
                setTimeout( ()=> {
                    dispatch({ type: actionTypes.setLoading, payload: false });
                    dispatch({type: actionTypes.setTypeRegister, payload: 'salida'})
                },2000)
                
            } catch (error) {
                dispatch({ type: actionTypes.setLoading, payload: false });
                setError(error);
            }
        } catch (error) {
            dispatch({ type: actionTypes.setLoading, payload: false });
        }
        
    };

    return { sendRegisters, sendOutputRegisters }

}



export { usePostRegister };
