import supabase from "../../supabase";
import { useState } from "react";

function useDeleteCarrier() {

    const tableCarriers = 'transportistas';
    const [loadingDelete, setLoadingDelete] = useState();
    const [errorDelete, setErrorDelete] = useState(null)

    const deleteCarrier = async (idCarrier) => {
        try {
            const { error } = await supabase
                .from(tableCarriers)
                .delete()
                .eq('id', idCarrier)
            return error
        } catch (error) {
            setErrorCarrier(error)
        }
    }

    return { loadingDelete, errorDelete, deleteCarrier }

}

export { useDeleteCarrier };