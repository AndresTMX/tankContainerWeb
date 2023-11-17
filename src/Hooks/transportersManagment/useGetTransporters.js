import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetTransporters() {

    const tableTransporters = 'transportistas';
    const [updateTransporters, setUpdateTransporters] = useState(false);
    const [loadingTransporters, setLoadingTransporters] = useState();
    const [errorTransporter, setErrorTransporter] = useState(null);
    const cache = JSON.parse(localStorage.getItem(tableTransporters));
    const [transporters, setTransporters] = useState([]);

    useEffect(() => {
        if (!cache) {
            getAllTransporters();
        } else {
            setTransporters(cache);
        }
    }, [updateTransporters])

    const getAllTransporters = async () => {
        setLoadingTransporters(true)
        try {
            const { data, error } = await supabase
                .from(tableTransporters)
                .select()
            setTransporters(data);
            localStorage.setItem(tableTransporters, JSON.stringify(data))
            setLoadingTransporters(false)
            return data
        } catch (error) {
            console.log(error)
            setErrorTransporter(error)
            setLoadingTransporters(false)
        }

    }

    const updateAllTransports = () => {
        localStorage.removeItem(tableTransporters);
        setUpdateTransporters(!updateTransporters)
    }

    return { loadingTransporters, errorTransporter, updateAllTransports, transporters }

}

export { useGetTransporters };