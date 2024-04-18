import { createContext, useContext, useState, useRef } from "react";
import { useRealtime } from "../../Hooks/FetchData";
//services
import { getWashingWithStatus } from "../../services/lavados";
//libreries
import { toast } from "sonner";
//hooks
import { useLocation } from "react-router-dom";

const LavadoContext = createContext();

const LavadoProvider = ({ children }) => {

    const searchValue = useRef();

    const statusPendientes = ['programado', 'sellado'];
    const statusRealizados = ['lavado']

    const [status, setStatus] = ([statusPendientes]);

    const { pathname } = useLocation();

    async function getLavados() {
        const { error, data } = await getWashingWithStatus(status);
        return { error, data }
    }

    const { loading, error, data } = useRealtime(getLavados, 'lavados', 'lavados', status);

    //searcher state
    const dataMode = 'data'
    const searchMode = 'search'
    const [mode, setMode] = useState(dataMode)
    const [dataSearch, setDataSearch] = useState([])
    const [item, selectItem] = useState({})

    //parametro de busqueda
    function extractKey(lavado) {
        try {

            let key

            if (pathname.includes('pendientes')) {

                let id = lavado['id'] || "";
                let cliente = lavado['registros_detalles_entradas']['clientes']['cliente'].toLowerCase() || "";
                let especificacion = lavado['registros_detalles_entradas']['especificacion'].toLowerCase() || "";
                let numero_tanque = lavado['registros_detalles_entradas']['numero_tanque'] || "";
                let tipo = lavado['registros_detalles_entradas']['tipo'].toLowerCase() || "";
                
                key = `${id}-${numero_tanque}-${especificacion}-${tipo}-${cliente}`
            }

            if (pathname.includes('realizados')) {

            }

            return key

        } catch (error) {
            console.error(error)
        }
    }

    //array dinamico
    const dataDinamic = mode === dataMode ? data : dataSearch;
    console.log("🚀 ~ LavadoProvider ~ dataDinamic:", dataDinamic)

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
        <LavadoContext.Provider value={{ loading, error, dataDinamic, searchValue, item, mode, handleKeyPress, onChangeClear, selectItem }}>
            {children}
        </LavadoContext.Provider>
    )
}

export { LavadoProvider, LavadoContext }

export function useLavadoContext() {
    const context = useContext(LavadoContext);
    return context;
}