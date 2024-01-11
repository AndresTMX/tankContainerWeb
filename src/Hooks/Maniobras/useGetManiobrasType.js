import supabase from "../../supabase";
import { useEffect, useState } from "react";

function useGetManiobrasType(typeManiobra) {

    const [errorManiobra, setErrorManiobra] = useState(null);
    const [loadingManiobra, setLoadingManiobra] = useState(null);
    const [maniobras, setManiobras] = useState([]);
    const [update, setUpdate] = useState(false);

    const getManiobrasConfirm = async () => {
        setErrorManiobra(null)
        setLoadingManiobra(true);

        const { data, error } = await supabase
            .from('registros')
            .select(`*`)
            .eq('status', 'confirm')
            .order('created_at', { ascending: false })
            .range(0, 50)
        if (error) {
            setErrorManiobra(error)
            const cache = localStorage.getItem('maniobras_realizadas');
            if (cache) {
                setManiobras(JSON.parse(cache))
                setLoadingManiobra(false)
            }
        } else {
            setTimeout(() => {
                setManiobras(data)
                setLoadingManiobra(false)
                localStorage.setItem('maniobras_realizadas', JSON.stringify(data))
            }, 1000)
        }

    }

    const getManiobrasPending = async () => {
        setErrorManiobra(null)
        setLoadingManiobra(true)

        const { data, error } = await supabase
        .from('registros')
        .select(`*`)
        .eq('status', 'forconfirm')
        .order('created_at', { ascending: false })
        .range(0, 50)

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
        setManiobras([])
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