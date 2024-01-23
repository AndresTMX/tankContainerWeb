import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetTypeWashing() {

    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState([]);

    const getTypesWashing = async () => {
        setError(null)
        try {
            const { data, error } = await supabase
                .from('tipos_lavado')
                .select('*')

            if (error) {
                throw new Error(`Error al obtener los tipos de lavado`)
            }

            setLoading(false)
            setData(data)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }

    }

    useEffect(() => {
        getTypesWashing()
    }, [])

    return { data, error, loading }


}

export { useGetTypeWashing };