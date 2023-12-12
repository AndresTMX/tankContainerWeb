import supabase from "../../supabase";
import { useEffect, useState } from "react";

function useGetManiobrasType(typeManiobra) {

    const [errorManiobra, setErrorManiobra] = useState(null);
    const [loadingManiobra, setLoadingManiobra] = useState(null);
    const [maniobras, setManiobras] = useState([]);
    const [update, setUpdate] = useState(false);

    const getManiobrasConfirm = async () => {

        setLoadingManiobra(true);

        const { data, error } = await supabase
            .from('registros')
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
            setErrorManiobra(error)
            const cache = localStorage.getItem('maniobras_realizadas');
            if (cache) {
                setManiobras(JSON.parse(cache))
                setLoadingManiobra(false)
            }
        } else {
            const filterRequest = data.length >= 1 ?
                data.filter((request, index) => request.registros_detalles_entradas[index] === 'maniobras') : [];
            setTimeout(() => {
                setManiobras(filterRequest)
                setLoadingManiobra(false)
                localStorage.setItem('maniobras_realizadas', JSON.stringify(filterRequest))
            }, 1000)
        }

    }

    const getManiobrasPending = async () => {
        setLoadingManiobra(true)

        const { data, error } = await supabase
            .from('registros')
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
                    tanques(
                        status
                    )
                )
            `)
            .is('checkIn', null)
            .order('create_at', { ascending: false })
            .range(0, 19)


        if (error) {
            setErrorManiobra(error)
            const cache = localStorage.getItem('maniobras_pendientes');
            if (cache) {
                setManiobras(JSON.parse(cache))
                setLoadingManiobra(false)
            }
        }

        if (!error) {
            setTimeout(() => {
                setManiobras(data)
                setLoadingManiobra(false)
                localStorage.setItem('maniobras_pendientes', JSON.stringify(data))
            }, 1000)
        }
    }

    const forceUpdate = () => setUpdate(!update);

    const routerFetch = () => {
        const routes = {
            confirmado: () => getManiobrasConfirm(),
            pendiente: () => getManiobrasPending(),
        }

        if (routes[typeManiobra]) {
            routes[typeManiobra]();
        }
    }

    useEffect(() => {
        routerFetch();
    }, [typeManiobra, update])

    return {errorManiobra, loadingManiobra, maniobras, forceUpdate}

}

export { useGetManiobrasType };