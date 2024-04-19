import supabase from "../../supabase";
import { useRealtime } from "../FetchData";

function useDetailsForManiobra(idManiobra, type) {

    const tableDetails = type === 'entrada' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';
    const columnFilter = type === 'entrada' ? 'entrada_id' : 'salida_id';
    const consultSelect = type === 'entrada' ?
        `*, transportistas (id, name), clientes (*)` :
        `*, registros (*) , transportistas (id, name), clientes (*)`

    const getDetailsForManiobra = async () => {
        try {

            const { data, error } = await supabase
                .from(tableDetails)
                .select(consultSelect)
                .eq(columnFilter, idManiobra)

            return { error, data }
        } catch (error) {
            console.error(error)
        }
    }

    const { error, loading, data } = useRealtime(getDetailsForManiobra, false, tableDetails, [type, idManiobra]);

    return { error, loading, data }

}

export { useDetailsForManiobra };