import supabase from "../../supabase";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { useState, useEffect, useContext } from "react";

function useGetRegisters() {

    const [state, dispatch] = useContext(ManiobrasContext);

    const { typeRegister, update } = state;

    const tableRegisters = 'registros';
    const tableManiobrasChecklist = 'maniobras_checklist';
    const [errorGetRegisters, setErrorGetReisters] = useState(false);
    const [requestGetRegisters, setRequestGetRegisters] = useState([]);
    const [loadingGetRegisters, setLoadingGetRegisters] = useState(true);
    const nameStorageCache = `registros_vigilancia_${typeRegister}`;

    useEffect(() => {
        getInputsRegisters()
    }, [typeRegister, update])

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
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        )
                    `)
                    .eq('type', typeRegister)
                    .is('checkIn', null)
                    .order('create_at', { ascending: false })
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
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        )
                    `)
                    .eq('type', typeRegister)
                    .is('checkIn', null)
                    .order('create_at', { ascending: false })
                    .range(0, 19)
                if (error) {
                    setErrorGetReisters(error)
                    console.log(error)
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

            if (typeRegister === 'checklist_pendientes') {
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
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        )
                    `)
                    .eq('type', 'entrada')
                    .not('checkIn', 'is', null)
                    .order('create_at', { ascending: false })
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

            if (typeRegister === 'confirmado') {
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
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        )
                    `)
                    .eq('type', 'entrada')
                    .not('checkIn', 'is', null)
                    .order('create_at', { ascending: false })
                    .range(0, 19)
                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                        setLoadingGetRegisters(false)
                    }
                } else {
                    const filterRequest = data.length >= 1 ?
                        data.filter((request) => request.registros_detalles_entradas[0].tractos.status === 'parked') : [];
                    setTimeout(() => {
                        setRequestGetRegisters(filterRequest)
                        setLoadingGetRegisters(false)
                        localStorage.setItem(nameStorageCache, JSON.stringify(filterRequest))
                    }, 1000)
                }
            }

            if (typeRegister === 'pendiente') {

                const { data, error } = await supabase
                    .from(tableRegisters)
                    .select(`
                        *,
                        registros_detalles_salidas (
                            id,
                            carga,
                            tracto,
                            numero_tanque,
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        ),
                        registros_detalles_entradas (
                            id,
                            carga,
                            tracto,
                            numero_tanque,
                            status,
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        )
                    `)
                    .is('checkIn', null)
                    .order('create_at', { ascending: false })
                    .range(0, 19)


                if (error) {
                    setErrorGetReisters(error)
                    const cache = localStorage.getItem(nameStorageCache);
                    if (cache) {
                        setRequestGetRegisters(JSON.parse(cache))
                        setLoadingGetRegisters(false)
                    }
                }

                if (!error) {
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