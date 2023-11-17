import supabase from "../../supabase";
import { useState, useContext } from "react";
import { DevelopmentContext } from "../../Context";
import { actionTypes } from "../../Reducers";
import { useGetTransporters } from "./useGetTransporters";

function usePostTrasporter() {

    const [state, dispatch] = useContext(DevelopmentContext);
    const {updateAllTransports} = useGetTransporters();
    const tableTransporters = 'transportistas';
    const [errorTransporter, setErrorTransporter] = useState(null)

    const sendTransporter = async (transporter) => {
        dispatch({type:actionTypes.setLoading, payload: true})
        try {
            const { data, error } = await supabase
                .from(tableTransporters)
                .insert({ name: transporter })
                .select()
                dispatch({type:actionTypes.setLoading, payload: false})
                updateAllTransports()
                return data
        } catch (error) {
            dispatch({type:actionTypes.setLoading, payload: false})
            setErrorTransporter(error)
        }

    }

    return { errorTransporter, sendTransporter }

}

export { usePostTrasporter };