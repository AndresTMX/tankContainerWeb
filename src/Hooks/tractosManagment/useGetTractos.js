import { useState, useEffect , useContext} from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import supabase from "../../supabase";
import { actionTypes } from "../../Reducers/GlobalReducer";

function useGetTractos() {

    const tableTractos = 'tractos'
    const [tractos, setTractos] = useState([]);
    const [errorTractos, setErrorTracto] = useState(false);
    const cache = JSON.parse(localStorage.getItem('tractos_list'));
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    useEffect( () => {
        GetNumTractos();
    },[])

    const GetNumTractos = async() => {

        const { data, error } = await supabase.from(tableTractos)
        .select('tracto')

        if(error){
            setErrorTracto(error)
            setTractos(cache)
            
        }else{
            setTractos(data)
            localStorage.setItem('tractos_list', JSON.stringify(data))
        }
    }


    const updateTractoWhitId = async(idTracto, newStatus) => {
        const { error } = await supabase.from(tableTractos)
        .update({status: newStatus })
        .eq('tracto', idTracto)

        if(error){
            setErrorTracto(error)
            dispatchGlobal({type: actionTypes.setNotification, payload: 'Error al actualizar el estatus del tractocamion'})
            }
    }

    return {tractos, errorTractos, GetNumTractos, updateTractoWhitId}

}

export {useGetTractos};