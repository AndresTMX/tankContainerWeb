import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetRegisters(typeRegister) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updateForce, setUpdateForce] = useState(false)

    const updater = () => setUpdateForce(!updateForce);

    const getInputRegisters = async () => {
        setError(null)
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
            setTimeout(() => {
                setData(data);
                setLoading(false);
            }, 1000)
        }
    }

    const getOutputRegisters = async () => {
        setError(null)
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
            setTimeout(() => {
                setData(data);
                setLoading(false);
            }, 1000)
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
    }, [typeRegister, updateForce])



    return { getInputRegisters, getOutputRegisters, updater, data, error, loading }
}

export { useGetRegisters };