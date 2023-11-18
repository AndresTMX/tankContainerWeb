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
    const [loadingGetRegisters, setLoadingGetRegisters] = useState(null);
    const [typeRegister, setTypeRegister] = useState('entrada');
    const cacheRegistersEntrada = localStorage.getItem('registros_vigilancia_entrada');
    const cacheRegistersSalida = localStorage.getItem('registros_vigilancia_salida');
    const cacheAllRegisters = localStorage.getItem('registros_vigilancia_ambas');
    const nameStorageCache = `registros_vigilancia_${typeRegister}`;

    useEffect(() => {
        getInputsRegisters()
    }, [typeRegister])

    const getInputsRegisters = async () => {
        try {
            setLoadingGetRegisters(true)
            setErrorGetReisters(null)
            if (typeRegister === 'entrada' || typeRegister === 'salida') {
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
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                    }
                } else {
                    setRequestGetRegisters(data)
                    setLoadingGetRegisters(false)
                    localStorage.setItem(nameStorageCache, JSON.stringify(data))
                }
            } else {
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
                    .order('date_time', { ascending: false })
                    .range(0, 19)
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                    }
                } else {
                    setRequestGetRegisters(data)
                    setLoadingGetRegisters(false)
                    localStorage.setItem(nameStorageCache, JSON.stringify(data))
                }
            }

        } catch (error) {
            setLoadingGetRegisters(false)
            setErrorGetReisters(true)
        }
    }

    const handleTypeRegister = (newType) => {
        setTypeRegister(newType)
    }

    return { requestGetRegisters, errorGetRegisters, loadingGetRegisters, handleTypeRegister, typeRegister }


}

export { useGetRegisters };