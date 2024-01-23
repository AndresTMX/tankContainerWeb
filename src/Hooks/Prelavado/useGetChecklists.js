import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetCheckListPrelavado(idRegister) {

    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const getChecklistPrelavado = async () => {
        setError(null)
        setChecklist([])
        setLoading(true)
        const { error, data } = await supabase
            .from('prelavado_checklist')
            .select('*')
            .eq('registro_detalle_entrada_id', idRegister)

        if (error) {
            setLoading(false)
            setError(error.message)
        }

        setChecklist(data)
        setLoading(false)
    }

    useEffect(() => {
        if (idRegister) {
            getChecklistPrelavado();
        }
    }, [idRegister])

    return { checklist, loading, error}

}

export { useGetCheckListPrelavado };