import supabase from "../../supabase";
import { DevelopmentContext } from "../../Context";
import { useState, useEffect, useContext } from "react";

function useGetRegisters() {

    const [state, dispatch] = useContext(DevelopmentContext);

    const { typeRegister } = state;

    const tableRegisters = 'registros';
    const tableRegistersInputDetails = 'registros_detalles_entradas';
    const [errorGetRegisters, setErrorGetReisters] = useState(false);
    const [requestGetRegisters, setRequestGetRegisters] = useState([]);
    const [loadingGetRegisters, setLoadingGetRegisters] = useState(true);
    const nameStorageCache = `registros_vigilancia_${typeRegister}`;

    useEffect(() => {
        getInputsRegisters()
    }, [typeRegister])

    const getInputsRegisters = async () => {
        try {
            setLoadingGetRegisters(true)
            setErrorGetReisters(false)

            if (typeRegister === 'entrada') {
                const { data, error } = await supabase
                    .from(tableRegisters)
                    .select(`
                        *,
                        registros_detalles_entradas (
                            id,
                            carga,
                            tracto,
                            numero_tanque,
                            status,
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
                    .eq('type', typeRegister)
                    .order('checkIn', { ascending: false })
                    .range(0, 19)
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                        setLoadingGetRegisters(false)
                    }
                } else {
                    setRequestGetRegisters(data)
                    setLoadingGetRegisters(false)
                    localStorage.setItem(nameStorageCache, JSON.stringify(data))
                }
            }

            if (typeRegister === 'salida') {
                const { data, error } = await supabase
                    .from(tableRegisters)
                    .select(`
                        *,
                        registros_detalles_salidas (
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
                    .eq('type', typeRegister)
                    .order('checkIn', { ascending: false })
                    .range(0, 19)
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                        setLoadingGetRegisters(false)
                    }
                } else {
                    setRequestGetRegisters(data)
                    setLoadingGetRegisters(false)
                    localStorage.setItem(nameStorageCache, JSON.stringify(data))
                }
            }

            if (typeRegister === 'ambas') {
                const { data, error } = await supabase
                    .from(tableRegisters)
                    .select(`
                        *,
                        registros_detalles_entradas (
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
                        ),
                        registros_detalles_salidas (
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
                    .order('checkIn', { ascending: false })
                    .range(0, 39)
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                        setLoadingGetRegisters(false)
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

    return { requestGetRegisters, errorGetRegisters, loadingGetRegisters }


}

export { useGetRegisters };