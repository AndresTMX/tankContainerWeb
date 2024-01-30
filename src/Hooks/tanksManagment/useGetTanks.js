import { useState } from "react";
import supabase from "../../supabase";

function useGetTanks() {

    const [tanks, setTanks] = useState([]);
    const [tankLoading, setTankLoading] = useState(null);
    const [tankError, setTankError] = useState(null);

    const [detailTank, setDetailTank] = useState([]);
    const [errorDetail, setErrorDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(null);

    const getTanks = async () => {

        setTankLoading(true)

        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select(`status, numero_tanque`)
            .eq('status', 'almacenado')

        if (error) {
            setTankError(error);
            setTankLoading(false);
        }

        const setFilterRepeat = new Set();
        for (let item of data) {
            setFilterRepeat.add(item)
        }

        setTanks([...setFilterRepeat])
        setTankLoading(false)


    }

    const getTanksReadyToOutput = async () => {
        setTankLoading(true)

        const { error, data } = await supabase
            .from('lavados')
            .select(`* , registros_detalles_entradas(*)`)
            .eq('status', 'sellado')

        if (error) {
            setTankError(error);
            setTankLoading(false);
        }

        setTankLoading(false);
        const dataFilter = data.map((item) => ({
            tanque: item.registros_detalles_entradas.numero_pipa || item.registros_detalles_entradas.numero_tanque,
            numero_tanque: item.registros_detalles_entradas.numero_pipa || item.registros_detalles_entradas.numero_tanque,
        }))
        setTanks(dataFilter);
    }

    const getAllTanks = async () => {

        setTankLoading(true)

        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select(`status, numero_tanque, id`)
            .eq('carga', 'tanque')
            .neq('status', 'forconfirm')

        if (error) {
            setTankError(error);
            setTankLoading(false);
        }

        setTankLoading(false);
        setTanks(data);
    }

    const getDetailsForTank = async (numero_tanque) => {
        try {
            setLoadingDetail(true)
            const { error, data } = await supabase
                .from('tanques_detalles')
                .select('*')
                .eq('tanque', numero_tanque)

            if (error) {
                setDetailTank(error.message)
            }

            setDetailTank(data);
            setLoadingDetail(false);

        } catch (error) {
            setLoadingDetail(false)
        }
    }


    return { getTanks, getAllTanks, getDetailsForTank, getTanksReadyToOutput, tanks, tankLoading, tankError, detailTank, errorDetail, loadingDetail }

}

export { useGetTanks };