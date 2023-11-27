import supabase from "../../supabase";
import { useState, useContext } from "react";
import { actionTypes } from "../../Reducers/GlobalReducer";
import { GlobalContext } from "../../Context/GlobalContext";

function usePostTrasporter() {

    const [state, dispatch] = useContext(GlobalContext);
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
                return data
        } catch (error) {
            dispatch({type:actionTypes.setLoading, payload: false})
            setErrorTransporter(error)
        }

    }

    return { errorTransporter, sendTransporter }

}

export { usePostTrasporter };