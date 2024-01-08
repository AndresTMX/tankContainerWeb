import { useState, useEffect } from "react";
import { filterInputRegistersForStatus } from "../../Helpers/transformRegisters";
import supabase from "../../supabase";

function useGetEIR(typeRegister) {

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const getChecklistPending = async () => {
        setLoading(true)

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
            .eq('type', 'entrada')
            .not('checkIn', 'is', null)
            .order('created_at', { ascending: false })
            .range(0, 50)

        if (error) {
            setError(error)
            const cache = localStorage.getItem('checklist_EIR_pendientes');
            if (cache) {
                setData(JSON.parse(cache))
                setLoading(false)
            }
        } else {
            setTimeout(() => {
                const newData = filterInputRegistersForStatus(data, 'eir');
                setData(newData)
                setLoading(false)
                localStorage.setItem('checklist_EIR_pendientes', JSON.stringify(newData))
            }, 1000)
        }
    }

    const getCheckListFullfiled = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('maniobras_checklist')
            .select(`
                     *,
                     clientes(*),
                     users_data(*),
                     registros_detalles_entradas(*)
                     `)
            .order('created_at', { ascending: false })
            .range(0, 100)
        if (error) {
            setError(error)
            const cache = localStorage.getItem('checklist_EIR_realizados');
            if (cache) {
                setData(JSON.parse(cache))
                setLoading(false)
            }
        } else {
            setTimeout(() => {
                setData(data)
                setLoading(false)
                localStorage.setItem('checklist_EIR_realizados', JSON.stringify(data))
            }, 1000)
        }
    }

    const routerFetch = () => {

        const routes = {
            pendientes: () => getChecklistPending(),
            realizados: () => getCheckListFullfiled()
        }

        if (routes[typeRegister]) {
            routes[typeRegister]()
        }
    }

    useEffect(() => {
        routerFetch()
    }, [typeRegister])

    return {loading, error, data, setData}

}

export { useGetEIR };