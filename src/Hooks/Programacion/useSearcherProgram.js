import { useState } from "react";

function useSearcherProgram(arrayData) {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const onChangueSearch = (e) => setSearch(e.target.value)

    function Searcher() {
        try {
            setError(null)
            const busqueda = search.toLowerCase();

            const newData = arrayData.find((obj) => {

                const results = [];

                const { carga, clientes, numero_pipa, numero_tanque, tipo, transportistas } = obj.registros_detalles_entradas || {};
                const { name: transportista } = transportistas || {};
                const { cliente } = clientes || {};
                const num_carga = numero_pipa || numero_tanque;

                if(carga.includes(busqueda)|| num_carga.includes(busqueda) || tipo.includes(busqueda)|| transportista.includes(busqueda)|| cliente.toLowerCase().includes(busqueda) ){
                    results.push(obj)
                }


                if(results.length === 0){
                    throw new Error(`No hay coincidencias con ${search}`)
                }

                setResults(results)

            })

        } catch (error) {
            setError(error.message)
        }
    }

    return {  search, onChangueSearch, Searcher }

}

export { useSearcherProgram }
