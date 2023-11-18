import supabase from "../../supabase";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/"
import { DevelopmentContext } from "../../Context";
import { actionTypes } from "../../Reducers";

function useGetRegisters() {

    const { key } = useContext(AuthContext);
    const [state, dispatch] = useContext(DevelopmentContext);
    const session = JSON.parse(sessionStorage.getItem(key));
    const { loading } = state;

    const tableRegisters = 'registros';
    const tableRegistersDetails = 'registros_detalles';

    const [errorGetRegisters, setErrorGetReisters] = useState(null);
    const [requestGetRegisters, setRequestGetRegisters] = useState([]);
    const [typeRegister, setTypeRegister] = useState('entrada')


    useEffect(() => {
        getInputsRegisters()
    }, [typeRegister])

        const getInputsRegisters = async () => {
            try {
                const { data, error } = await supabase
                    .from(tableRegisters)
                    .select(`
                        *,
                        registros_detalles (
                            id,
                            carga,
                            tracto,
                            numero_tanque,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            )
                        )
                    `)
                    .eq('tipo_registro', typeRegister)
                    .order('date_time', { ascending: false })
                    .range(0, 19)
                    
                setRequestGetRegisters(data)
            } catch (error) {
                setErrorGetReisters(error)
            }
        }

        const handleTypeRegister = (newType) => {
            setTypeRegister(newType)
        }

    return { requestGetRegisters, errorGetRegisters, handleTypeRegister, typeRegister }


}

export { useGetRegisters };