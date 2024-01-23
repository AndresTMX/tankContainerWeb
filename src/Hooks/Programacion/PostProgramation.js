import supabase from "../../supabase";
import { useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function usePostProgramation () {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    
    const createProgram = async(newWashing, idDetailRegister) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })
        
            const { data: dataWashing, error: errorWashing } = await supabase
            .from('lavados')
            .insert({...newWashing})
            .select()

            if(errorWashing){
                throw new Error(`Error al programar lavado, error: ${errorWashing.message}`)
            }

            const { error: errorUpdate} = await supabase
            .from('registros_detalles_entradas')
            .update({status: 'programado'})
            .eq('id', idDetailRegister)

            if(errorUpdate){
                const {error: errorDelete} = await supabase.from('lavados').delete().eq('id', dataWashing[0].id) 
                throw new Error(`Error al actualizar estatus de registro, error: ${errorUpdate.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Lavado programado'
            })

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    return {createProgram}

}

export {usePostProgramation};