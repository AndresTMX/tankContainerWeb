import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetWashingForAprobe() {

    const [type, setType] = useState('pendientes');
    const [loading, setLoading] = useState(null);
    const [washing, setWashing] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const cache = localStorage.getItem(`lavados_por_aprobrar_${type}`) ?
        JSON.parse(localStorage.getItem(`lavados_por_aprobrar_${type}`)) : [];

    const updaterList = () => setUpdate(!update);

    const getWashingsForAprobe = async () => {
        try {
            setWashing([])
            setError(null)
            setLoading(true)

            const { data, error } = await supabase
                .from('lavados')
                .select('*, prelavados_revisiones(*), tipos_lavado(*), registros_detalles_entradas(*)')
                .eq('status', 'lavado')

            if (error) {
                throw new Error(`Error al consultar la base de datos`)
            }

            setWashing(data)
            localStorage.setItem('lavados_por_aprobar_pendientes', JSON.stringify(data))
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    const getWashingsFull = async () => {
        try {
            setWashing([])
            setError(null)
            setLoading(true)

            const { data, error } = await supabase
                .from('lavados')
                .select('*, prelavados_revisiones(*), tipos_lavado(*), registros_detalles_entradas(*)')
                .eq('status', 'aprobado')

            if (error) {
                throw new Error(`Error al consultar la base de datos`)
            }

            setWashing(data)
            localStorage.setItem('lavados_por_aprobar_realizados', JSON.stringify(data))
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    const routerFetch = () => {

        const routes = {
            pendientes: () => getWashingsForAprobe(),
            realizados: () => getWashingsFull()
        }

        if (routes[type]) {
            routes[type]()
        }
    }

    useEffect(() => {
        routerFetch()
    }, [type, update])

    return { loading, error, washing, type, setType, updaterList, cache }

}

export { useGetWashingForAprobe };