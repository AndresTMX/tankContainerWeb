import supabase from "../../supabase";
import { useState, useContext, useEffect } from "react";

function useGetRepairs(typeRegister) {

    const tableReparaciones = 'reparaciones'
    const [repairs, setRepairs] = useState([]);
    const [loadingRepairs, setLoadingRepairs] = useState(null);
    const [errorRepairs, setErrorRepairs] = useState(null);
    const [updater, setUpdater] = useState(false)

    useEffect(() => {
        fetchRouter();
    }, [typeRegister, updater])

    const getRepairsPending = async () => {
        setRepairs([])
        setErrorRepairs(null)
        setLoadingRepairs(true)

        const { data, error } = await supabase
            .from('reparaciones')
            .select(`*, registros_detalles_entradas(*, clientes(*), registros(*) )`)
            .eq('status', 'pendiente')
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

    const getRepairsProces = async () => {
        setRepairs([])
        setErrorRepairs(null)
        setLoadingRepairs(true)

        const { data, error } = await supabase
            .from('reparaciones')
            .select(`*, registros_detalles_entradas(*, registros(*)), users_data(*) )`)
            .eq('status', 'proceso')
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

    const getRepairsComplete = async () => {
        setRepairs([])
        setErrorRepairs(null)
        setLoadingRepairs(true)

        const { data, error } = await supabase
            .from('reparaciones')
            .select(`*, registros_detalles_entradas(*, registros(*)), users_data(*) )`)
            .eq('status', 'completado')
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

    const fetchRouter = () => {
        const routes = {
            pendiente: () => getRepairsPending(),
            proceso: () => getRepairsProces(),
            completado: () => getRepairsComplete()
        }

        try {
            if (routes[typeRegister]) {
                routes[typeRegister]()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateRepairs = () => setUpdater(!updater)

    return { repairs, loadingRepairs, errorRepairs, updateRepairs }

}

function useRepairsStored(id) {

    const [repair, setRepair] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    async function getRepairs() {
        try {
            setLoading(true)
            const { error, data } = await supabase
                .from('reparaciones')
                .select('*')
                .eq('id_detalle_registro', id)
                .order('checkIn', { ascending: false })

            if (error) {
                throw new Error(`Error al recuperar datos de reparación del taque, error: ${error.message}`)
            }

            setRepair(data);
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        setLoading(null)
        getRepairs()
    }, [id]);

    return { repair, loading, error }

}

export { useGetRepairs, useRepairsStored };

