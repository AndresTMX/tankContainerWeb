import { useState, createContext, useContext, useRef } from "react";
import { useRealtime } from "../../Hooks/FetchData";
import { useLocation } from "react-router-dom";
//services
import {
    getPrewashingForInspect,
    getPrewashingInspect,
    getWashingForAprobe,
    getAllWashingSuccess,
    getAllWashingReleased,
    getAllWashingRejected

} from "../../services/lavados";
//libraries
import { toast } from "sonner";

const CalidadContext = createContext();

export function CalidadProvider({ children }) {

    const searchValue = useRef();
    const { pathname } = useLocation();
    const [cache, setCache] = useState('');
    const [table, setTable] = useState('');

    const routerFetcher = {
        '/calidad/prelavados/pendientes': getPrewashingForInspect,
        '/calidad/prelavados/realizados': getPrewashingInspect,
        '/calidad/lavados/pendientes': getWashingForAprobe,
        '/calidad/lavados/realizados': getAllWashingSuccess,
        '/calidad/liberados/listos': getAllWashingReleased,
        '/calidad/liberados/rechazados': getAllWashingRejected,
    }

    const routerTablesDB = {
        '/calidad/prelavados/pendientes': 'lavados',
        '/calidad/prelavados/realizados': 'prelavados_revisiones',
        '/calidad/lavados/pendientes': 'lavados',
        '/calidad/lavados/realizados': 'lavados',
        '/calidad/liberados/listos': 'lavados',
        '/calidad/liberados/rechazados': 'lavados',
    }

    const routerCache = {
        '/calidad/prelavados/pendientes': 'prelavados_pendientes',
        '/calidad/prelavados/realizados': 'prelavados_revisados',
        '/calidad/lavados/pendientes': 'lavados_pendientes_revisiones',
        '/calidad/lavados/pendientes': 'lavados_realizados_revisiones',
        '/calidad/liberados/listos': 'lavados_liberados',
        '/calidad/liberados/rechazados': 'lavados_rechazados',
    }

    async function fetch() {
        try {

            let fetchFunction

            if (routerFetcher[pathname]) {
                fetchFunction = routerFetcher[pathname]
                setTable(routerTablesDB[pathname])
                setCache(routerCache[pathname])
            }

            const { error, data } = await fetchFunction()

            if (error) {
                throw new Error(error)
            }

            return { error, data }
        } catch (error) {
            console.error(error?.message)
        }
    }

    const { error, loading, data } = useRealtime(fetch, cache, table, [pathname]);

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

            const routesFilter = {
                '/calidad/prelavados/pendientes': () => extractPrelavadosPendientes(item),
                '/calidad/prelavados/realizados': () => extractPrelavadoRealizado(item),
                '/calidad/lavados/pendientes': () => extractPrelavadosPendientes(item),
                '/calidad/lavados/realizados': () => extractPrelavadosPendientes(item),
                '/calidad/liberados/listos': () => extractPrelavadosPendientes(item),
                '/calidad/liberados/rechazados': () => extractPrelavadosPendientes(item),

            }

            if (routesFilter[pathname]) {
                key = routesFilter[pathname]()
            }

            return key

        } catch (error) {
            console.error(error)
        }
    }

    function extractPrelavadosPendientes(item) {

        let key

        let id = item['id'] || "";
        let cliente = item['registros_detalles_entradas']['clientes']['cliente'].toLowerCase() || "";
        let especificacion = item['registros_detalles_entradas']['especificacion'].toLowerCase() || "";
        let numero_tanque = item['registros_detalles_entradas']['numero_tanque'] || "";
        let tipo = item['registros_detalles_entradas']['tipo'].toLowerCase() || "";
        key = `${id}-${numero_tanque}-${especificacion}-${tipo}-${cliente}`

        return key
    }

    function extractPrelavadoRealizado(item) {
        let key

        let id = item['lavados']['id'].toLowerCase() || "";
        let especificacion = item['lavados']['registros_detalles_entradas']['especificacion'].toLowerCase() || "";
        let numero_tanque = item['lavados']['registros_detalles_entradas']['numero_tanque'] || "";
        let tipo = item['lavados']['registros_detalles_entradas']['tipo'].toLowerCase() || "";
        key = `${id}-${numero_tanque}-${especificacion}-${tipo}`

        return key
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
        <CalidadContext.Provider value={{ loading, error, dataDinamic, searchValue, item, mode, pathname, handleKeyPress, onChangeClear, selectItem }}>
            {children}
        </CalidadContext.Provider>
    )
}

export function useCalidadContext() {
    const context = useContext(CalidadContext);
    return context
}