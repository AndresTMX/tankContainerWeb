import supabase from "../../supabase";
import { useEffect, useState } from "react";

function useGetOperators() {

    const tablaOperadores = 'operadores'
    const [operators, setOperators] = useState([])
    const [loadingOperators, setLoadingOperators] = useState(null)
    const [errorOperators, setErrorOperators] = useState(null)

    useEffect(() => {
        getOperators();
    }, [])


    const getOperators = async () => {
        try {
            setLoadingOperators(true)
            const { data, error } = await supabase
                .from(tablaOperadores)
                .select()
            setOperators(data)
            setLoadingOperators(false)
        } catch (error) {
        setErrorOperators(error)
    }
}


export { useGetOperators };