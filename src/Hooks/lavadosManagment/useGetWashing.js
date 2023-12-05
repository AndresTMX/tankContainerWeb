import supabase from "../../supabase";
import { useState, useEffect, useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";

function useGetWashing() {

    const [state, dispatch] = useContext(PrelavadoContext);
    const [washing, setWashing] = useState([])
    const [errorWashing, setErrorWashing] = useState(null)
    const [loadignWashing, setLoadingWashing] = useState(null);
    const cache = JSON.parse(localStorage.getItem(state.typeWashing));

    useEffect(() => {
        getRegistersWashing();
    }, [])

    const getRegistersWashing = async () => {
        setLoadingWashing(true)
        const { data, error } = await supabase
            .from('registros_detalles_entradas')
            .select(`
       *,
       registros(*)
       `
            )
            .eq('status', state.typeWashing)

        if (!error) {
            setTimeout(() => {
                setWashing(data);
                setLoadingWashing(false);
                localStorage.setItem(state.typeWashing, JSON.stringify(data))
            }, 1000)
        } else {
            setWashing(cache)
            setLoadingWashing(false);
            setErrorWashing(error);
            alert(error.message)
        }

    }

    return { washing, errorWashing, loadignWashing }

}

export { useGetWashing };