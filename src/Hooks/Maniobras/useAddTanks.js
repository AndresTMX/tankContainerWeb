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

    const updateTankStatus = async (updates, tanques) => {
        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        const updatesTanks = tanques.map(async (tanque) => {
            try {
                const { error } = await supabase.from('tanques')
                    .update({ ...updates })
                    .eq('tanque', tanque)

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
        });

        try {
            await Promise.all(updatesTanks)
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
            payload: 'Tanques actualizados con exito'
        })
    }

    const updateTanksRepair = async (tanques) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        const updatesTanks = tanques.map(async (tanque) => {
            try {
                const { error } = await supabase.from('tanques')
                    .update({ 
                        reparaciones_externas: tanque.reparaciones_externas,
                        reparaciones_internas: tanque.reparaciones_internas
                     })
                    .eq('tanque', tanque.tanque)

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
        });

        try {
            await Promise.all(updatesTanks)
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
            payload: 'Tanques actualizados con exito'
        })
    }
  

    const deleteTanks = async (tanques) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        const deleteTanks = tanques.map(async (tanque) => {

            try {
                const { error } = await supabase.from('tanques')
                    .delete()
                    .eq('tanque', tanque)

                if (error) {
                    throw new Error(`Error al eliminar el tanque ${tanque}`);
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
            await Promise.all(deleteTanks);
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

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: false
        });

        dispatchGlobal({
            type: actionTypesGlobal.setNotification,
            payload: 'Tanques eliminados'
        });


    }

    return { addTanks, deleteTanks, updateTanksRepair, updateTankStatus }

}

export { useAddTanks };