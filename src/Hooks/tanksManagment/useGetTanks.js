import { useState } from "react";
import supabase from "../../supabase";

function useGetTanks() {

    const [tanks, setTanks] = useState([])
    const [tankLoading, setTankLoading] = useState(null)
    const [tankError, setTankError] = useState(null)

    const getTanks = async () => {

        setTankLoading(true)
        const { error, data } = await supabase.from('tanques')
            .select(`*`)

        if (!error) {
            setTanks(data);
            setTankLoading(false);
        } else {
            setTankError(error);
            setTankLoading(false);
        }
    }

    const tanksReady = tanks.length >= 1 ? tanks.filter((tanque) => tanque.status === 'ready') : [];

    const rowTanks = tanks.length >= 1 ? tanks.map((tanque) => ({
        id: tanque.tanque,
        col1: tanque.tanque,
        col2: tanque.status,
        col3: tanque.reparaciones_internas? tanque.reparaciones_internas: '0',
        col4: tanque.reparaciones_externas? tanque.reparaciones_externas: '0'
    })) : [];

    return { getTanks, tanks, tanksReady, rowTanks, tankLoading, tankError }

}

export { useGetTanks };