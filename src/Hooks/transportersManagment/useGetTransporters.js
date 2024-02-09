import { ConnectingAirportsOutlined } from "@mui/icons-material";
import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useGetTransporters() {

    const tableTransporters = 'transportistas';
    const cache = JSON.parse(localStorage.getItem(tableTransporters));
    const [updateTransporters, setUpdateTransporters] = useState(false);
    const [loadingTransporters, setLoadingTransporters] = useState();
    const [errorTransporter, setErrorTransporter] = useState(null);
    const [transporters, setTransporters] = useState([]);

    useEffect(() => {
        getAllTransporters();
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
        setUpdateTransporters(!updateTransporters);
    }

    const createNewTransporter = async(newTransporter) => {
        try {
            const { error } = await supabase
            .from('transportistas')
            .insert({ name: newTransporter.name })

            if(error){
                throw new Error(` Error al crear nueva linea, error: ${error.message}`)
            }

            return { error }

        } catch (error) {
            console.error(error)
            setErrorTransporter(error.message)
        }
    }

    return { loadingTransporters, errorTransporter, updateAllTransports, transporters, createNewTransporter }

}

export { useGetTransporters };