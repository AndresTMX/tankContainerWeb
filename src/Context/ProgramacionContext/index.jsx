import supabase from "../../supabase";
import { useEffect, useState, useContext, createContext, useRef } from "react";
import { useLocation } from "react-router-dom";
//services
import { getStored, getPrograming } from "../../services/programacion";
import { getAllOrdersDinamic, getOrdersAprobe } from "../../services/ordenes";
//libreries
import { toast } from "sonner";

const ProgramacionContext = createContext();

export function ProgramacionProvider({ children }) {

    const { pathname } = useLocation();
    const searchValue = useRef();

    //fetch state
    const [registers, setRegisters] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    //searcher state
    const dataMode = 'data'
    const searchMode = 'search'
    const [dataSearch, setDataSearch] = useState([])
    const [mode, setMode] = useState(dataMode)
    const [update, setUpdate] = useState(false);


    //modificadores de ordenamiento 
    const [statusField, setStatusField] = useState('por confirmar');
    const [asscending, setAsscending] = useState(true);


    function handleStatus(order, callback) {
        setStatusField(order)
        callback()
    }

    function handleAssending(callback) {
        setAsscending(!asscending);
        callback()
    }


    //parametro de busqueda
    function extractKey(order) {
        try {
            if (pathname.includes('solicitudes')) {
                return `${order['id']}-${order['clientes']['cliente'].toLowerCase()}-${order['destinos']['destino'].toLowerCase()}`
            } else {
                return `${order['registros_detalles_entradas']['numero_tanque']}-${order['ordenes_lavado']['id']}`;
            }
        } catch (error) {
            console.error(error)
        }
    }

    //array dinamico
    const dataDinamic = mode === dataMode ? registers : dataSearch;

    //functions searcher
    function SearchInData() {
        try {
            const newData = new Map();
            const resultados = []


            registers.forEach(element => {
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

    //cache controller
    const typeCache = pathname.includes('solicitudes') ? 'ordenes_lavado' : 'lavados_confirmados';

    async function getOrders() {
        const { error, data } = await getAllOrdersDinamic(statusField, asscending);
        return { error, data }
    }

    async function getArpobe() {
        const { error, data } = await getOrdersAprobe(asscending);
        return { error, data }
    }

    //fetch de datos
    async function fetchData(fetchFunction) {
        try {

            const { error, data } = await fetchFunction();

            if (error) {
                throw new Error(error);
            }

            setRegisters(data);
            localStorage.setItem(typeCache, JSON.stringify(data));
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    }

    //escuchador de la base 
    const changes = supabase.channel(`custom-all-channel-ordenes_lavado`)
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'ordenes_lavado' },
            (payload) => {
                setUpdate(!update)
            }
        )
        .subscribe()
    

    useEffect(() => {
        setRegisters([])
        setLoading(true);
        setError(null);
        setMode(dataMode)
        const fetchFunction = pathname.includes('solicitudes') ? getOrders : getArpobe;
        fetchData(fetchFunction);

        return () => {
            // Limpiar suscripción cuando el componente se desmonta
            changes.unsubscribe();
        };
    }, [pathname, update, statusField, asscending]);

    const states = { searchValue, dataDinamic, loading, error, mode, statusField, asscending }
    const actions = { SearchInData, handleKeyPress, onChangeClear, setRegisters, handleAssending, handleStatus, }

    return (
        <ProgramacionContext.Provider value={{ states, actions }}>
            {children}
        </ProgramacionContext.Provider>
    );
}

export function useContextProgramacion() {
    const context = useContext(ProgramacionContext);
    return context;
}


