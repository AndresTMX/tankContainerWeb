import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetLiberations() {

    const [typeRegister, setTypeRegister] = useState('liberado')
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState([]);
    const [update, setUpdate] = useState(false);
    const nameCache = `lavados_${typeRegister}s`;
    const cache = JSON.parse(localStorage.getItem(nameCache))|| [];

    const updaterList = () => setUpdate(!update)

    const getLiberations = async () => {
        setError(null)
        setData([])
        try {
            const { data, error } = await supabase
                .from('lavados')
                .select('*, registros_detalles_entradas(*, registros(*), clientes(*), transportistas(*) ), tipos_lavado(*)')
                .in('status', ['liberado', 'finalizado'])
                .order('tentativeEnd', { ascending: false })
                .limit(100)

            if (error) {
                throw new Error(`Error al obtener lavados sellados, error: ${error.message}`)
            }

            localStorage.setItem(nameCache, JSON.stringify(data))
            setLoading(false)
            setData(data)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }

    }

    const getRejectecteds = async () => {
        setError(null)
        setData([])
        try {
            const { data, error } = await supabase
                .from('lavados')
                .select('*, registros_detalles_entradas(*)')
                .eq('status', 'rejected')
                .order('tentativeEnd', { ascending: false })
                .limit(100)

            if (error) {
                throw new Error(`Error al obtener lavados sellados, error: ${error.message}`)
            }

            setLoading(false)
            localStorage.setItem(nameCache, JSON.stringify(data))
            setData(data)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    const routerFetch = () => {
        const routes = {
            liberado: () => getLiberations(),
            rechazado: () => getRejectecteds()
        }

        if (routes[typeRegister]) {
            routes[typeRegister]()
        }
    }

    useEffect(() => {
        routerFetch()
    }, [typeRegister])

    return { data, error, loading, cache, typeRegister, setTypeRegister, updaterList }


}

export { useGetLiberations };