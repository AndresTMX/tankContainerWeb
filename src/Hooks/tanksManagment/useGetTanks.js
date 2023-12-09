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

    const tanksReady = tanks.length >= 1 ? tanks.filter((tanque) => tanque.status === 'ready'):[];

    return {getTanks, tanks, tanksReady, tankLoading, tankError}

}

export {useGetTanks};