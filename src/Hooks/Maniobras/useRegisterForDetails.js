import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useRegisterForDetails(idDetail) {

    const [register, setRegister] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRegisterWhitIdDetail()
    }, [idDetail])

    const getRegisterWhitIdDetail = async () => {
        try {
            setError(null)
            setLoading(null)

            const { data, error } = await supabase
                .from('registros')
                .select('*')
                .eq('id', idDetail)
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(`Error al consultar el registro de entrada, error: ${error.message}`)
            }

            setRegister(data[0])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    return { register, loading, error }

}

export { useRegisterForDetails };