import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetRegisters(typeRegister) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const getInputRegisters = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('registros')
            .select(`
                        *,
                        registros_detalles_entradas (
                            id,
                            carga,
                            tracto,
                            numero_tanque,
                            status,
                            numero_pipa,
                            transportistas (
                                id,
                                name
                            ),
                            operadores (
                                id,
                                nombre,
                                correo,
                                contacto
                            ),
                            tractos(
                                tracto,
                                status
                            ),
                            tanques(
                                status
                            )
                        )
                    `)
            .eq('type', typeRegister)
            .is('checkIn', null)
            .order('create_at', { ascending: false })
            .range(0, 50)

        if (error) {
            setError(error);
            setLoading(false)
        } else {
            setData(data);
            setLoading(false);
        }
    }

    const getOutputRegisters = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('registros')
            .select(`
            *,
            registros_detalles_salidas (
                id,
                carga,
                tracto,
                numero_tanque,
                numero_pipa,
                transportistas (
                    id,
                    name
                ),
                operadores (
                    id,
                    nombre,
                    correo,
                    contacto
                ),
                tractos(
                    tracto,
                    status
                ),
                tanques(
                    status
                )
            )
        `)
            .eq('type', typeRegister)
            .is('checkIn', null)
            .order('create_at', { ascending: false })
            .range(0, 50)

        if (error) {
            setError(error);
            setLoading(false)
        } else {
            setData(data);
            setLoading(false);
        }
    }

    const routerFetch = () => {

        const routes = {
            entrada: () => getInputRegisters(),
            salida: () => getOutputRegisters()
        }

        if (routes[typeRegister]) {
            routes[typeRegister]();
        }
    };

    useEffect(() => {
        routerFetch();
    }, [typeRegister])



    return { getInputRegisters, getOutputRegisters, data, error, loading }
}

export { useGetRegisters };