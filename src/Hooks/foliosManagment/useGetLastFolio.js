import { useState, useEffect } from "react";
import supabase from "../../supabase";

function useGetLastFolio() {

    const tableChecklistManiobras = 'maniobras_checklist';
    const [errorFolio, setErrorFolio] = useState(false)
    const [folio, setFolio] = useState('folio')

    useEffect(() => {
        getLastFolio();
    }, [])

    const getLastFolio = async () => {
        const { data, error } = await supabase
            .from(tableChecklistManiobras)
            .select(`folio`)
            .order('created_at', { ascending: false })
            .range(0, 1)

        if (error) {
            setErrorFolio(error)
        } else {
            if(data.length === 0 ){
                setFolio(1)
            }else{
                setFolio(data[0].folio + 1)
            }
        }

    }

    const getAllCheckList = async () => {
        const { data, error } = await supabase
            .from(tableChecklistManiobras)
            .select(`
            *,
            users_data(*),
            registros_detalles_entradas(*)
            `)
            .order('created_at', { ascending: false })
            .range(0, 1)

        if (error) {
            setErrorFolio(error)
        } else {
            setFolio(data)
        }
    }

    return { getLastFolio, errorFolio, folio }


}

export { useGetLastFolio };