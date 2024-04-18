import { createContext, useContext, useState, useRef } from "react";
import { useRealtime } from "../../Hooks/FetchData";
//services
import { getRegistersInput, getRegistersOutput } from "../../services/registros";
//libreries
import { toast } from "sonner";
//hooks
import { useLocation } from "react-router-dom";

const VigilanciaContext = createContext();

const VigilanciaProvider = ({ children }) => {

    const { pathname } = useLocation();

    const searchValue = useRef();

    async function get() {

        let fetchFunction

        if (pathname.includes('entradas')) {
            fetchFunction = getRegistersInput;
        }

        if (pathname.includes('salidas')) {
            fetchFunction = getRegistersOutput;
        }

        const { error, data } = await fetchFunction();
        return { error, data }

    }

    const { loading, error, data } = useRealtime(get, 'registros-vigilancia', 'registros', [pathname]);

    //searcher state
    const dataMode = 'data'
    const searchMode = 'search'
    const [mode, setMode] = useState(dataMode)
    const [dataSearch, setDataSearch] = useState([])
    const [item, selectItem] = useState({})

    //parametro de busqueda
    function extractKey(item) {
        try {

            let key

            if (pathname.includes('entrada')) {
                let id = item['id'] || "";
                let operador = item['operadores']['nombre'].toLowerCase() || "";
                let economico = item['numero_economico']
                return `${id}-${operador}-${economico}`
            }

            if (pathname.includes('salida')) {

            }

            return key
        } catch (error) {
            console.error(error)
        }
    }

    //array dinamico
    const dataDinamic = mode === dataMode ? data : dataSearch;
    console.log("🚀 ~ VigilanciaProvider ~ dataDinamic:", dataDinamic)

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
        <VigilanciaContext.Provider
            value={{
                loading,
                error,
                dataDinamic,
                searchValue,
                item,
                mode,
                pathname,
                handleKeyPress,
                onChangeClear,
                selectItem
            }}>
            {children}
        </VigilanciaContext.Provider>
    )
}

export { VigilanciaContext, VigilanciaProvider }

export function useVigilanciaContext() {
    const context = useContext(VigilanciaContext);
    return context;
}