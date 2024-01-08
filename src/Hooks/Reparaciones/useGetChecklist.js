import supabase from "../../supabase";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useGetCheckList(idDetailRegister) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [checklist, setChecklist] = useState([]);
    const [dataJson, setDataJson] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getChecklistWhitId(idDetailRegister);
    }, [idDetailRegister])

    const getChecklistWhitId = async (id) => {
        try {
            setChecklist([])
            setError(null)
            setLoading(true)

            const { data, error } = await supabase.from('maniobras_checklist')
                .select(`*, clientes(*)`)
                .eq('registro_detalle_entrada_id', id)

            if (error) {
                throw new Error(`Error al cargar el checklist`)
            } else {
                setLoading(false)
                setChecklist(data)
                setDataJson(JSON.parse(data[0].data))
            }

        } catch (error) {
            setError(error)
            setLoading(false)
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }
    

    return {checklist, dataJson, loading, error}

}

export { useGetCheckList };

