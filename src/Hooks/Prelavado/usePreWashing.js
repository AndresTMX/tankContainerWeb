import supabase from "../../supabase";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function usePreWashing() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [washing, setWashing] = useState([])
    const [update, setUpdate] = useState(false);
    const [errorWashing, setErrorWashing] = useState(null)
    const [loadignWashing, setLoadingWashing] = useState(null);
    const nameCache = `prelavados_pendientes`
    const cache = JSON.parse(localStorage.getItem(nameCache));

    useEffect(() => {
        getRegistersPending()
    }, [update])

    const updater = () => setUpdate(!update);

    const getRegistersPending = async () => {
        try {
            setLoadingWashing(true)
            setErrorWashing(null)
            const { data, error } = await supabase
                .from('lavados')
                .select(` *, registros_detalles_entradas(*, clientes(*), registros(*))`)
                .eq('status', 'pending')
                .order('tentativeEnd', { ascending: false })


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


    return { washing, errorWashing, loadignWashing, updater, cache}

}

export { usePreWashing };