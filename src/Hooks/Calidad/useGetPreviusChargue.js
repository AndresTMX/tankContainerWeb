import supabase from "../../supabase";
import { useState, useEffect, } from "react";

function useGetPreviusChargue(tanque) {

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState([]);

    const getPrevius = async () => {
        try {
            setLoading(true)
            setError(null)
            const { error, data } = await supabase
                .from('tanques_detalles')
                .select('*')
                .eq('tanque', tanque)

            if (error) {
                throw new Error(`Error al obtener las cargas previas, error: ${error}`)
            }

            if (data.length >= 1) {
                const cargas = JSON.parse(data[0].cargas_previas)
                setInfo(cargas)
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        if (tanque) {
            getPrevius()
        }
    }, [tanque])

    return { loading, error, info }

}

export { useGetPreviusChargue };