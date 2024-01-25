import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetConditionsWashing(idLavado) {

    const [conditions, setConditions] = useState([]);
    const [loadin, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const getConditionsWhitId = async () => {
        try {
            setError(null)
            setConditions([])

            const { error, data } = await supabase
                .from('condiciones_lavado')
                .select(`users_data(*), bahia, data, created_at`)
                .eq('lavado_id', idLavado)

            if (error) {
                throw new Error(`Error al consultar condiciones de lavado, error: ${error.message}`)
            }

            setLoading(false)
            setConditions(data)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        if (idLavado) {
            getConditionsWhitId()
        }
    }, [idLavado])

    return { conditions, loadin, error }

}

export { useGetConditionsWashing };