import supabase from "../../supabase";
import { useEffect, useState } from "react";

function useGetOperators() {

    const tablaOperadores = 'operadores'
    const [operators, setOperators] = useState([])
    const [loadingOperators, setLoadingOperators] = useState(null)
    const [errorOperators, setErrorOperators] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const cache = JSON.parse(localStorage.getItem('operadores'));
        if(!cache){
            getOperators();
        }

        if(cache){
            setOperators(cache)
        }
    }, [update])


    const getOperators = async () => {
        setLoadingOperators(true)
        try {
            const { data, error } = await supabase
                .from(tablaOperadores)
                .select()
            setOperators(data)
            setLoadingOperators(false)
            localStorage.setItem('operadores', JSON.stringify(data))
        } catch (error) {
            setErrorOperators(error)
            setLoadingOperators(false)
        }
    }

    const updateOperators = () => {
        localStorage.removeItem('operadores');
        setUpdate(!update)
    }

    const states = {operators, loadingOperators}

    const functions = {updateOperators}

    return {states, functions}

}

export { useGetOperators };