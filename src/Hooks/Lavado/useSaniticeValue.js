import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useSaniticeValue() {

    const [value, setValue] = useState([])
    const [error, setError] = useState(null)

    const getLastConcentration = async () => {

        setError(null)
        setValue([])

        const { data, error } = await supabase
            .from('concentraciones_sanitizante')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)

        if (error) {
            setError(error.message)
        }

        setValue(data)
    }

    const newConcentration = async (concentracion) => {
        setError(null)
        const { error, data } = await supabase
            .from('concentraciones_sanitizante')
            .insert({ concentracion })
            .select()

        if (error) {
            setError(error.message)
            alert('Error al registrar nueva concentración')
        }

        setValue(data[0])
    }

    useEffect(() => {
        getLastConcentration()
    }, [])

    return { value, error, newConcentration }

}

export { useSaniticeValue };