import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useReadyToChargue(typeItem) {

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const getTanksReadyToOutput = async () => {
        setData([])
        setLoading(true)

        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select(`status, numero_tanque, id`)
            .eq('carga', 'tanque')
            .eq('status', 'liberado')

        if (error) {
            setError(error);
            setLoading(false);
        }

        setLoading(false);
        setData(data);
    }

    const getPipasReadyToOutput = async () => {
        setData([])
        setLoading(true)

        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select(`status, numero_tanque, id`)
            .eq('carga', 'pipa')
            .eq('status', 'liberado')

        if (error) {
            setError(error);
            setLoading(false);
        }

        setLoading(false);
        setData(data);
    }

    const routerFetch = () => {
        const routes = {
            tanque: () => getTanksReadyToOutput(),
            pipa: () => getPipasReadyToOutput()
        }

        if (routes[typeItem]) {
            routes[typeItem]()
        }
    }

    useEffect(() => {
        routerFetch()
    }, [typeItem])

    return { loading, error, data }
}

export { useReadyToChargue };