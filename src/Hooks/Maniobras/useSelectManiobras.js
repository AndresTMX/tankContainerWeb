import { useState, useEffect } from "react";
import { toast } from "sonner";

function useSelectManiobras(detallesRegister, tanksReady, tankLoading) {

    useEffect(() => {
        setCopyTanksManiobras(detallesRegister)
        setCopyTanksFree(tanksReady)
    }, [tankLoading])

    const [copyTanksFree, setCopyTanksFree] = useState()
    const [copyTanksManiobras, setCopyTanksManiobras] = useState();

    const [dataTank, setDataTank] = useState([])

    const colorItemTank = (tanque) => dataTank.find((item) => item.tanque === tanque) ? 'info' : 'default';

    const validateNumTank = () => {
        if ((copyTanksManiobras.length) > 3) {
            
            toast.error('No puedes agregar más de 4 tanques')

            return false
        } else {
            return true
        }
    }

    const toggleTank = (tank) => {
      
        const newState = copyTanksManiobras.length >= 1 ? [...copyTanksManiobras] : [];
        const newStateTanksReady = copyTanksFree.length >= 1 ? [...copyTanksFree] : [];
        const index = copyTanksManiobras.findIndex((item) => item === tank);
        const indexTanksReady = copyTanksFree.findIndex((item) => item === tank);
        const repeat = copyTanksManiobras.find((item) => item === tank)

        if (index < 1 && repeat === undefined && validateNumTank()) {
            newState.push(tank)
            newStateTanksReady.splice(indexTanksReady, 1)
        }

        if (index >= 0 && repeat) {
            newState.splice(index, 1)
        }

        setCopyTanksFree(newStateTanksReady)
        setCopyTanksManiobras(newState)

    }

    const deletTanksChargue = (tank) => {
   
        const newStateTankReady = copyTanksFree.length >= 1 ? [...copyTanksFree] : [];
        const newStateTanksManiobras = copyTanksManiobras.length >= 1 ? [...copyTanksManiobras] : [];
        const indexInTanksManiobras = copyTanksManiobras.findIndex((item) => item === tank);

        if (copyTanksManiobras.length === 0) {
            toast.error('No puedes eliminar todos los tanques')
        } else {
            newStateTanksManiobras.splice(indexInTanksManiobras, 1);
            newStateTankReady.push(tank);

            setCopyTanksManiobras(newStateTanksManiobras)
            setCopyTanksFree(newStateTankReady)
        }


    }

    return { colorItemTank, toggleTank, deletTanksChargue, dataTank, copyTanksFree, copyTanksManiobras }

}

export { useSelectManiobras };