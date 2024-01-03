import supabase from "../../supabase";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function usePreWashingInspect(typeInspect) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [inspect, setInspect] = useState([])
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(null);
    const nameCache = `inspeccion_prelavados_${typeInspect}`
    const cache = JSON.parse(localStorage.getItem(nameCache));

    const updater = () => setUpdate(!update);

    const getInspectPending = async () => {
        try {
            setInspect([])
            setLoading(true)
            setError(null)
            const { data, error } = await supabase
                .from('prelavado_checklist')
                .select(`*`)
                .eq('status', 'pendiente')
                .order('created_at', { ascending: false })
                .range(0, 100)
            if (error) {
                throw new Error(`Error al consultar prelavados por inspeccionar, error: ${error.message}`)
            }

            setTimeout(() => {
                setInspect(data);
                setLoading(false);
                localStorage.setItem(nameCache, JSON.stringify(data))
            }, 1000)

        } catch (error) {
            setLoading(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const getInspectComplete = async () => {
        try {
            setInspect([])
            setLoading(true)
            setError(null)
            const { data, error } = await supabase
                .from('prelavados_revisiones')
                .select(`*, 
                registros_detalles_entradas(*),
                users_data(*)`)
                .order('created_at', { ascending: false })
                .range(0, 100)
            if (error) {
                throw new Error(`Error al consultar prelavados inspeccionados, error: ${error.message}`)
            }

            setTimeout(() => {
                setInspect(data);
                setLoading(false);
                localStorage.setItem(nameCache, JSON.stringify(data))
            }, 1000)

        } catch (error) {
            setLoading(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const routerFetch = () => {

        const routes = {
            pendiente: () => getInspectPending(),
            revisado: () => getInspectComplete()
        }

        if (routes[typeInspect]) {
            routes[typeInspect]()
        }


    }

    useEffect(() => {
        routerFetch()
    }, [ typeInspect ,update])

    return { inspect, error, loading, cache, updater }

}

export { usePreWashingInspect };