import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useAddTanks() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const addTanks = async (arrayTanks, status) => {
        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });


        const newTanks = arrayTanks.map(async (tanque) => {

            try {
                const { error } = await supabase.from('tanques').insert({ tanque: tanque, status: status })

                if (error) {
                    throw new Error(`Error al subir el tanque: ${tanque}`)
                }

            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                });
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                });
            }
        });

        try {
            await Promise.all(newTanks)
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Base de datos actualizada con exito'
            });
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }

    }

    const updateTank = async (updates, tanque) => {
        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        try {
            const { error } = await supabase.from('tanques').update({}).eq('tanque', tanque)
            if (error) {
                throw new Error(`Error al actualizar el tanque ${tanque}`)
            }
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

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        })
        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Tanque actualizado con exito'
        })
    }

    return { addTanks, updateTank }

}

export { useAddTanks };