import supabase from "../../supabase";
import { useState } from "react";

function useDeleteTransporter() {

    const tableTransporters = 'transportistas';
    const [loadingDelete, setLoadingDelete] = useState();
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteTransporter = async (idCarrier) => {
        try {
            const { error } = await supabase
                .from(tableTransporters)
                .delete()
                .eq('id', idCarrier)
            return error
        } catch (error) {
            setErrorDelete(error)
        }

    }



    return { loadingDelete, errorDelete, deleteTransporter }

}

export { useDeleteTransporter };