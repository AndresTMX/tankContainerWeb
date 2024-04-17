import supabase from "../../supabase";

export async function createManiobra(operador_id, numero_economico, arrayRegistros) {
    try {

        //crear nuevo registro general de tipo entrada
        const { data: dataRegister, error: errorCreateRegister } = await supabase
            .from('registros')
            .insert({
                type: 'entrada',
                numero_economico: numero_economico,
                operador_id: operador_id,
            })
            .select()

        if (errorCreateRegister) {
            throw new Error(`Error al crear registro de entrada, error: ${errorCreateRegister.message}`)
        }

        //crear nuevos detalles del registro de entrada
        const detailsRegisters = arrayRegistros.map(async (register) => {

            const { data: dataDetails, error: errorCreateDetails } = await supabase
                .from('registros_detalles_entradas')
                .insert({
                    carga: 'tanque',
                    tipo: register.tipo,
                    entrada_id: dataRegister[0].id,
                    cliente_id: register.cliente_id,
                    numero_tanque: register.numero_tanque,
                    especificacion: register.especificacion,
                    transportista_id: register.transportista_id,
                })
                .select()

            if (errorCreateDetails) {
                throw new Error(`Error al crear detalles del registro, error: ${errorCreateDetails.message}`)
            }

        });

        try {
            await Promise.all(detailsRegisters)
        } catch (error) {
            await supabase.from('registros').delete().eq('id', dataRegister[0].id)
            throw new Error(error.message)
        }

        const arrayUpdates = arrayRegistros.map(async (r) => {
            const { error } = await supabase
                .from('puerto')
                .update({ status: 'transportista' })
                .eq('id', r.id)

            if (error) {
                throw new Error('Error al actualizar los estatus de puerto')
            }
        })

        try {
            await Promise.all(arrayUpdates)
        } catch (error) {
            await supabase.from('registros').delete().eq('id', dataRegister[0].id)
        }

        return { errorCreateRegister }
    } catch (error) {
        console.error(error)
    }
}

export async function updateRegistroWhitId(id, updates) {
    try {
        const { error } = await supabase
            .from('registros_detalles_entradas')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar detalles del tanque, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}