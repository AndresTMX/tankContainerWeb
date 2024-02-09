import { useState } from "react";

function useSearcherProgram(arrayData, typeRegister, search, setSearch) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const busqueda = search.toLowerCase();

    const OnKeySearch = (e) => {

        if (e.key === 'Enter') {
            Searcher()
        }

        if (e.key === 'Backspace') {
            setResults([])
            setSearch('')
            setLoading(null)
            setError(null)
        }

    }

    function Searcher() {
        try {
            setError(null)
            setResults([])
            setLoading(true)


            const routesSearch = {
                almacenado: () => searchInStorage(),
                programado: () => searchInWashing()
            }

            if (routesSearch[typeRegister]) {
                routesSearch[typeRegister]()
            } else {
                throw new Error(`Error al rutear busqueda`)
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
            console.error(error)
        }
    }

    function searchInStorage() {
        try {
            setLoading(true)
            const newData = arrayData.filter(obj => {
                const { numero_pipa, numero_tanque, tipo = '', especificacion = '' } = obj || {};

                return numero_pipa === busqueda || numero_tanque === busqueda || tipo.includes(busqueda) || especificacion.toLowerCase().includes(busqueda) || numero_tanque.replace(/-/g, '').includes(busqueda);
            });

            if (newData.length === 0) {
                throw new Error(`No hay coincidencias con ${busqueda}`);
            }

            setResults(newData);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
            console.error(error.message)
        }

    }

    function searchInWashing() {
        try {
            setLoading(true)
            const newData = arrayData.filter(obj => {

                const { numero_pipa, numero_tanque, tipo, especificacion } = obj.registros_detalles_entradas || {};
                return numero_pipa === busqueda || numero_tanque === busqueda || tipo.includes(busqueda) || especificacion.toLowerCase().includes(busqueda);
            });

            if (newData.length === 0) {
                throw new Error(`No hay coincidencias con ${busqueda}`);
            }

            setResults(newData);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
            console.error(error.message)
        }
    }

    const Functions = { Searcher, OnKeySearch }

    const States = { results, error, loading }

    return { Functions, States }

}

export { useSearcherProgram }

