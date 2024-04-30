import supabase from "../../supabase";

function useAddTanks() {

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
                throw new Error(error)
            }
        });

        try {
            await Promise.all(newTanks)
        } catch (error) {
           console.error(error?.message)
        }

    }

    const updateTankStatus = async (updates, tanques) => {
        
        const updatesTanks = tanques.map(async (tanque) => {
            try {
                const { error } = await supabase.from('tanques')
                    .update({ ...updates })
                    .eq('tanque', tanque)

                if (error) {
                    throw new Error(`Error al actualizar el tanque ${tanque}`)
                }

            } catch (error) {
               throw new Error(error)
            }
        });

        try {
            await Promise.all(updatesTanks)
        } catch (error) {
            console.error(error?.message)
        }

    }

    const updateTanksRepair = async (tanques) => {


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
                console.error(error?.message)
            }
        });

        try {
            await Promise.all(updatesTanks)
        } catch (error) {
            console.error(error?.message)
        }

    }

    const deleteTanks = async (tanques) => {

        const deleteTanks = tanques.map(async (tanque) => {

            try {
                const { error } = await supabase.from('tanques')
                    .delete()
                    .eq('tanque', tanque)

                if (error) {
                    throw new Error(`Error al eliminar el tanque ${tanque}`);
                }
            } catch (error) {
                console.error(error?.message)
            }
        });

        try {
            await Promise.all(deleteTanks);
        } catch (error) {
            console.error(error?.message)
        }

    }

    return { addTanks, deleteTanks, updateTanksRepair, updateTankStatus }

}

export { useAddTanks };