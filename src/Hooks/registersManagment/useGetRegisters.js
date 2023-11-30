import supabase from "../../supabase";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { useState, useEffect, useContext } from "react";

function useGetRegisters() {

    const [state, dispatch] = useContext(ManiobrasContext);

    const { typeRegister } = state;

    const tableRegisters = 'registros';
    const tableManiobrasChecklist = 'maniobras_checklist';
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
                    setTimeout(() => {
                        setRequestGetRegisters(data)
                        setLoadingGetRegisters(false)
                        localStorage.setItem(nameStorageCache, JSON.stringify(data))
                    }, 1000)
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
                    setTimeout(() => {
                        setRequestGetRegisters(data)
                        setLoadingGetRegisters(false)
                        localStorage.setItem(nameStorageCache, JSON.stringify(data))
                    }, 1000)
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
                    setTimeout(() => {
                        setRequestGetRegisters(data)
                        setLoadingGetRegisters(false)
                        localStorage.setItem(nameStorageCache, JSON.stringify(data))
                    }, 1000)
                }
            }

            if (typeRegister === 'checklist_realizados') {
                const { data, error } = await supabase
                    .from(tableManiobrasChecklist)
                    .select(`
                     *,
                     users_data(*),
                     registros_detalles_entradas(*)
                     `)
                    .order('created_at', { ascending: false })
                    .range(0, 100)
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                        setLoadingGetRegisters(false)
                    }
                } else {
                    setTimeout(() => {
                        setRequestGetRegisters(data)
                        setLoadingGetRegisters(false)
                        localStorage.setItem(nameStorageCache, JSON.stringify(data))
                    }, 1000)
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