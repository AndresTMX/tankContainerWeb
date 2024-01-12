import { useState } from "react";
import supabase from "../../supabase";

function useGetTanks() {

    const [tanks, setTanks] = useState([])
    const [tankLoading, setTankLoading] = useState(null)
    const [tankError, setTankError] = useState(null)

    const getTanks = async () => {

        setTankLoading(true)
        const { error, data } = await supabase
            .from('tanques_detalles')
            .select(`*`)

        if (!error) {
            const tanksWhitDetailsStatus = data.map(async (tanque) => {
                const { data: dataDetails, error: errorDetails } = await supabase
                    .from('registros_detalles_entradas')
                    .select('status, numero_tanque ')
                    .eq('numero_tanque', tanque.tanque)

                if (errorDetails) {
                    setTankError(errorDetails)
                } else {
                    const registros = data.map((registro) => ({ ...registro, status: dataDetails[0]?.status }))
                    setTanks(registros)
                }
            })

            try {
                await Promise.all(tanksWhitDetailsStatus);
            } catch (error) {
                setTankError(error)

            }
            setTankLoading(false);
        } else {
            setTankError(error);
            setTankLoading(false);
        }
    }

    const tanksReady = tanks.length >= 1 ? tanks.filter((tanque) => tanque.status === 'almacenado') : [];

    const rowTanks = tanks.length >= 1 ? tanks.map((tanque) => ({
        id: tanque.tanque,
        col1: tanque.tanque,
        col2: tanque.status ? tanque.status : 'error',
        col3: tanque.reparaciones_internas ? tanque.reparaciones_internas : '0',
        col4: tanque.reparaciones_externas ? tanque.reparaciones_externas : '0',
        col5: tanque.reingresos ? tanque.reingresos : 'error'
    })) : [];

    return { getTanks, tanks, tanksReady, rowTanks, tankLoading, tankError }

}

export { useGetTanks };