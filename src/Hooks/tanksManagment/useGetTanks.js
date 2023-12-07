import { useState } from "react";
import supabase from "../../supabase";

function useGetTanks() {

    const [tanks, setTanks] = useState([])
    const [tankLoading, setTankLoading] = useState(null)
    const [tankError, setTankError] = useState(null)
    
    const getTanks = async() => {

        setTankLoading(true)
        const {error, data} = await supabase.from('tanques')
        .select(`*`)

        if(!error){
            setTanks(data);
            setTankLoading(false);
        }else{
            setTankError(error);
            setTankLoading(false);
        }
    }

    return {getTanks, tanks, tankLoading, tankError}

}

export {useGetTanks};