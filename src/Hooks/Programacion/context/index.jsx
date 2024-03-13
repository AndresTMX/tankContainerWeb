import { useEffect, useState, useContext, createContext, useRef } from "react";
import { useLocation } from "react-router-dom";
//services
import { getStored, getPrograming } from "../../../services/programacion";

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

    //parametro de busqueda
    const keySearch = 'numero_tanque';

    //array dinamico
    const dataDinamic = mode === dataMode ? registers : dataSearch;

    //functions searcher
    function SearchInData() {
        try {
            const newData = new Map();
            const resultados = []


            registers.forEach(element => {
                newData.set(element[keySearch], element)
            });

            console.log(newData)
            console.log(searchValue.current.value)

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
    const typeCache = pathname.includes('almacenados') ? 'tanques_registros_almacenados' : 'lavados_programados';
    const cache = JSON.parse(localStorage.getItem(typeCache) || '[]');


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
            setLoading(false);
        }
    }

    useEffect(() => {
        setError(null);
        setLoading(true);
        setMode(dataMode)
        const fetchFunction = pathname.includes('almacenados') ? getStored : getPrograming;
        fetchData(fetchFunction);
    }, [pathname]);

    const states = { searchValue, dataDinamic, loading, error, mode }
    const actions = { SearchInData, handleKeyPress, onChangeClear }

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


