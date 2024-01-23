import supabase from "../../supabase";
import { useState , useEffect} from "react";

function useTypeWashing() {

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const cache = JSON.parse(localStorage.getItem('tipos_lavado') || '[]');

    const getAllTypes = async () => {
        try {
            setError(null)
            setLoading(true)
            const { data, error } = await supabase
                .from('tipos_lavado')
                .select(`*`)

            if (error) {
                throw new Error(`Error al obtener tipos de lavado, error: ${error.message}`)
            }
            localStorage.setItem('tipos_lavado', JSON.stringify(data))
            setTypes(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }

    }

    useEffect(() => {
        getAllTypes();
    }, [])

    return { types, loading, error, cache }

}

export { useTypeWashing };