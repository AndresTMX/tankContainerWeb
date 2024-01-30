import supabase from "../../supabase";
import { useState, useContext, useEffect } from "react";

function useGetRepairs(typeRegister) {

    const tableReparaciones = 'reparaciones'
    const [repairs, setRepairs] = useState([]);
    const [loadingRepairs, setLoadingRepairs] = useState(null);
    const [errorRepairs, setErrorRepairs] = useState(null);
    const [updater, setUpdater] = useState(false)

    useEffect(() => {
        getRepairs();
    }, [typeRegister, updater])

    const getRepairs = async () => {
        setRepairs([])
        setErrorRepairs(null)
        setLoadingRepairs(true)

        const { data, error } = await supabase
            .from(tableReparaciones)
            .select(`*,users_data(*), registros_detalles_entradas(*, registros(*))`)
            .eq('status', typeRegister)
            .eq('tipo_reparacion', 'interna')
            .order('checkIn', { ascending: false })

        setTimeout(() => {
            if (!error) {
                setRepairs(data)
                setErrorRepairs(false)
                setLoadingRepairs(false)
            } else {
                setErrorRepairs(error)
                setLoadingRepairs(false)
            }
        }, 1000)
    }

    const updateRepairs = () => setUpdater(!updater)

    return { repairs, loadingRepairs, errorRepairs, updateRepairs }


}

export { useGetRepairs };