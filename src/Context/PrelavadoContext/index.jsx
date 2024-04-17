import { createContext, useContext, useState, useRef } from "react";
import { useRealtime } from "../../Hooks/FetchData";
//services
import { getPending } from "../../services/prelavados";
//libreries
import { toast } from "sonner";

const PrelavadoContext = createContext();

const PrelavadoProvider = ({ children }) => {

    const searchValue = useRef();

    const { loading, error, data } = useRealtime(getPending, 'prelavados', 'lavados');

    //searcher state
    const dataMode = 'data'
    const searchMode = 'search'
    const [mode, setMode] = useState(dataMode)
    const [dataSearch, setDataSearch] = useState([])
    const [item, selectItem] = useState({})

    //parametro de busqueda
    function extractKey(lavado) {
        try {
            let id = lavado['id']|| "";
            let cliente = lavado['ordenes_lavado']['clientes']['cliente'].toLowerCase() || "";
            let especificacion = lavado['registros_detalles_entradas']['especificacion'].toLowerCase() || "";
            let numero_tanque = lavado['registros_detalles_entradas']['numero_tanque'] || "";
            let tipo = lavado['registros_detalles_entradas']['tipo'].toLowerCase() || "";
            return `${id}-${numero_tanque}-${especificacion}-${tipo}-${cliente}`

        } catch (error) {
            console.error(error)
        }
    }

    //array dinamico
    const dataDinamic = mode === dataMode ? data : dataSearch;

    //functions searcher
    function SearchInData() {
        try {
            const newData = new Map();
            const resultados = []


            dataDinamic.forEach(element => {
                newData.set(extractKey(element), element)
            });

            for (const [clave, valor] of newData) {
                if (clave.includes(searchValue.current.value)) {
                    resultados.push(newData.get(clave))
                }
            }

            setDataSearch(resultados)
            setMode(searchMode)

        } catch (error) {
            toast.error('error en busqueda')
            console.error(error)
        }
    }

    function handleKeyPress(e) {
        try {
            if (e.key === 'Enter') {
                SearchInData()
            }

        } catch (error) {
            toast.error('error en busqueda')
        }
    }

    function onChangeClear() {
        try {
            searchValue.current.value?.length <= 1 ? setMode(dataMode) : ''
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <PrelavadoContext.Provider value={{ loading, error, dataDinamic, searchValue, item, mode, handleKeyPress, onChangeClear, selectItem }}>
            {children}
        </PrelavadoContext.Provider>
    )
}

export { PrelavadoContext, PrelavadoProvider }

export function usePrelavadoContext() {
    const context = useContext(PrelavadoContext);
    return context;
}