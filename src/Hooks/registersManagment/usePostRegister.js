import supabase from "../../supabase";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/"
import { DevelopmentContext } from "../../Context";
import { actionTypes } from "../../Reducers";

function usePostRegister() {

    const { key } = useContext(AuthContext);
    const [state, dispatch] = useContext(DevelopmentContext);
    const session = JSON.parse(sessionStorage.getItem(key));
    const {loading} = state;

    const tableRegisters = 'registros';
    const tableRegistersDetails = 'registros_detalles';

    const [error, setError] = useState(null)
    const [request, setRequest] = useState([])

    const addRegisterData = async () => {
        try {
            const { data, error } = await supabase
                .from(tableRegisters)
                .insert({ user_id: session.id })
                .select()
            return data
        } catch (error) {
            console.log(error)
            setError(error)
        }

    }

    const addDetailsRegisterData = async (register, idRegister) => {
        try {
            const { data, error } = await supabase
                .from(tableRegistersDetails)
                .insert({ registro_id: idRegister, carga: register.carga, numero: register.numero,})
                .select()
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const sendRegisters = async(data) => {
        dispatch({type:actionTypes.setLoading, payload: true})
        const registerData = await addRegisterData(); 
        const dataValues = Object.values(data);
        const promises = dataValues.map(async (register) => {
            try {
                await addDetailsRegisterData(register, registerData[0].id);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        });
    
        try {
            await Promise.all(promises);
        } catch (error) {
            dispatch({type:actionTypes.setLoading, payload: false}) 
            console.error(error);
            setError(error);
        }
        dispatch({type:actionTypes.setLoading, payload: false})

    }

    return { sendRegisters }
}

export { usePostRegister };
