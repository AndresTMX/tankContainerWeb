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
            .select()
            .order('create_at', { ascending: false })
            .range(0, 1)

        if (error) {
            setErrorFolio(error)
        } else {
            setFolio(data)
        }

    }

}

export { useGetLastFolio };