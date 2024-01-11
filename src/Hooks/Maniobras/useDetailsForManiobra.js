import { useState, useEffect } from "react";
import supabase from "../../supabase";

function useDetailsForManiobra(idManiobra, type) {

    const [details, setDetials] = useState([]);
    const [loading, setLoading] = useState(null);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(null);
    const [detailManiobras, setDetailManiobras] = useState([]);

    const tableDetails = type === 'entrada' ? 'registros_detalles_entradas':'registros_detalles_salidas';

    const getDetailsForManiobra = async () => {
        try {
            setError(null);
            setLoading(true);

            const { data, error } = await supabase
                .from(tableDetails)
                .select(`
                *,
                operadores (id, nombre, correo, contacto ),
                transportistas (id, name)
                `)
                .eq('entrada_id', idManiobra)

            if (error) {
                throw new Error(error.message)
            }

            setDetials(data);
            const detailsInManiobras = data.length >= 1 ? data.filter((element) => element.status === 'maniobras' && element.carga === 'tanque') : [];
            setDetailManiobras(detailsInManiobras)
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw new Error(error.message)
        }
    }

    const updateDetails = () => setUpdate(!update)

    useEffect(() => {
        getDetailsForManiobra();
    }, [idManiobra, update])

    return { details, detailManiobras, loading, error, updateDetails }

}

export { useDetailsForManiobra };