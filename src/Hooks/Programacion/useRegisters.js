import supabase from "../../supabase";
import { useState, useEffect, useMemo } from "react";

function useRegistersProgramer() {

    //type register controller
    const [typeRegister, setTypeRegister] = useState("almacenado")
    //request controller
    const [registers, setRegisters] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    //cache controller
    const typeCache = typeRegister === "almacenado" ? 'tanques_registros_almacenados' : 'lavados_programados';
    const cache = JSON.parse(localStorage.getItem(typeCache) || '[]');

    const changueTypeRegister = (newType) => {
        setRegisters([])
        setTypeRegister(newType)
    }

    const consultValues = ['almacenado', 'almacenado-prelavado']

    const getRegistersStored = async () => {

        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select(`*, registros(*), clientes(*),transportistas(*)`)
            .in('status', consultValues)
            .order('created_at', { ascending: false })

        if (error) {
            throw new Error(`Error al recuperar registros de tanques almacenados, error: ${error.message}`)
        }

        setRegisters(data);
        localStorage.setItem(typeCache, JSON.stringify(data));
        setLoading(false);

    }

    const getWahsingProgram = async () => {

        const { error, data } = await supabase
            .from('lavados')
            .select(`* , registros_detalles_entradas(*, clientes(*), transportistas(*) )`)
            .eq('status', 'pending')
            .order('tentativeEnd', { ascending: true })

        if (error) {
            throw new Error(`Error al recuperar registros de tanques almacenados, error: ${error.message}`)
        }

        setRegisters(data);
        localStorage.setItem('lavados_programados', JSON.stringify(data));
        setLoading(false);
    }

    const memoizedFetchFunctions = useMemo(() => ({
        almacenado: getRegistersStored,
        programado: getWahsingProgram,
    }), []);

    const routerFetch = async () => {
        try {
            const routeFunction = memoizedFetchFunctions[typeRegister];

            if (routeFunction) {
                await routeFunction();
            } else {
                throw new Error(`Error de consulta, ruta ${typeRegister} no registrada`);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        setError(null)
        routerFetch()
    }, [typeRegister])

    return { registers, loading, error, cache, typeRegister, changueTypeRegister }

}

export { useRegistersProgramer };