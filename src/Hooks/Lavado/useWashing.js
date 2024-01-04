import supabase from "../../supabase";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useWashing(type) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [lavados, setLavados] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const nameCache = `lavados_${type}`
    const cache = JSON.parse(localStorage.getItem(nameCache));

    const updateList = () => setUpdate(!update);

    const getPendingWashing = async () => {
        try {
            setLoading(true)
            setLavados([])
            setError(null)

            const { error, data } = await supabase
                .from('prelavados_revisiones')
                .select('*, registros_detalles_entradas(carga, tracto, numero_tanque, numero_pipa, status)')
                .eq('status', 'pendiente')
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(`Error al consultar lavados pendientes , error: ${error.message}`)
            }

            setLavados(data)
            localStorage.setItem(nameCache, JSON.stringify(data));
            setLoading(false)

        } catch (error) {
            setError(error)
            setLoading(false)
            setLavados(cache)
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const getSuccessWashing = async () => {
        try {
            setLoading(true)
            setLavados([])
            setError(null)

            const { error, data } = await supabase
                .from('prelavados_revisiones')
                .select('*, registros_detalles_entradas(carga, tracto, numero_tanque, numero_pipa, status)')
                .eq('status', 'realizado')
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(`Error al consultar lavados realizados , error: ${error.message}`)
            }

            setLavados(data)
            localStorage.setItem(nameCache, JSON.stringify(data));
            setLoading(false)

        } catch (error) {
            setError(error)
            setLoading(false)
            setLavados(cache)
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const routerFetch = () => {

        const routes = {
            pendiente: () => getPendingWashing(),
            realizado: () => getSuccessWashing(),
        }

        try {
            if (routes[type]) {
                routes[type]()
            } else {
                throw new Error(`Error al consultar lavados ${type}`)
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    useEffect(() => {
        routerFetch()
    }, [type, update])

    return { lavados, loading, error, cache, updateList }

}

export { useWashing };