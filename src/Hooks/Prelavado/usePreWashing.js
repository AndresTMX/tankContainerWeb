import supabase from "../../supabase";
import { useState, useEffect, useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function usePreWashing(typeWashing) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [type, setType] = useState(typeWashing)
    const [washing, setWashing] = useState([])
    const [update, setUpdate] = useState(false);
    const [errorWashing, setErrorWashing] = useState(null)
    const [loadignWashing, setLoadingWashing] = useState(null);
    const nameCache = `prelavados_${type}`
    const cache = JSON.parse(localStorage.getItem(nameCache));

    useEffect(() => {
        routerFetch()
    }, [type, update])

    const updater = () => setUpdate(!update);

    const changueTypeWashing = (newType) => setType(newType);

    const getRegistersPending = async () => {
        try {
            setLoadingWashing(true)
            setErrorWashing(null)
            const { data, error } = await supabase
                .from('registros_detalles_entradas')
                .select(`
                 *,
                 registros(*)
                 `)
                .eq('status', type)

            if (error) {
                throw new Error(`Error al consultar lavados pendientes, error: ${error.message}`)
            }

            setTimeout(() => {
                setWashing(data);
                setLoadingWashing(false);
                localStorage.setItem(nameCache, JSON.stringify(data))
            }, 1000)

        } catch (error) {
            setLoadingWashing(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const getRegistersComplete = async () => {
        try {
            setLoadingWashing(true)
            setErrorWashing(null)
            const { data, error } = await supabase
                .from('prelavado_checklist')
                .select(`*`)
            if (error) {
                throw new Error(`Error al consultar lavados completados, error: ${error.message}`)
            }

            setTimeout(() => {
                setWashing(data);
                setLoadingWashing(false);
                localStorage.setItem(nameCache, JSON.stringify(data))
            }, 1000)

        } catch (error) {
            setLoadingWashing(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const routerFetch = () => {

        const routes = {
            prelavado: () => getRegistersPending(),
            lavado: () => getRegistersComplete(),
        }

        if (routes[type]) {
            routes[type]()
        }

    }

    return { washing, errorWashing, loadignWashing, updater, changueTypeWashing, type , cache}

}

export { usePreWashing };