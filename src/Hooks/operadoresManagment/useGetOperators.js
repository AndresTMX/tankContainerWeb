import supabase from "../../supabase";
import { useEffect, useState } from "react";

function useGetOperators() {

    const tablaOperadores = 'operadores'
    const [operators, setOperators] = useState([])
    const [loadingOperators, setLoadingOperators] = useState(null)
    const [errorOperators, setErrorOperators] = useState(null)
    const [update, setUpdate] = useState(false)
    const cache = JSON.parse(localStorage.getItem('operadores'));

    useEffect(() => {
        getOperators();
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

    const createNewOperator = async (newOperator) => {
        try {
            const { error } = await supabase
                .from('operadores')
                .insert({ nombre: newOperator.nombre })

            if (error) {
                throw new Error(`Error al agregar nuevo operador, error: ${error.message}`)
            }
            return { error }
        } catch (error) {
            console.error(error.message)
            return { error }
        }
    }

    const states = { operators, loadingOperators }

    const functions = { updateOperators, createNewOperator }

    return { states, functions }

}

export { useGetOperators };