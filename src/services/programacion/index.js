import supabase from "../../supabase";

export async function getStored() {

    const consultValues = ['almacenado', 'almacenado-prelavado']

    try {

        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select(`*, registros(*), clientes(*),transportistas(*)`)
            .in('status', consultValues)
            .order('created_at', { ascending: false })

        if (error) {
            throw new Error(`Error al recuperar registros de tanques almacenados, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getPrograming() {
    try {
        const { error, data } = await supabase
            .from('lavados')
            .select(`* , registros_detalles_entradas(*, clientes(*), transportistas(*) )`)
            .eq('status', 'pendiente')
            .order('tentativeEnd', { ascending: true })

        if (error) {
            throw new Error(`Error al recuperar registros de tanques almacenados, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function programNewWashing(newWashing) {
    try {

        const { id_detalle_entrada } = newWashing || {};

        const { data, error } = await supabase
            .from('lavados')
            .insert({ ...newWashing })
            .select()

        if (error) {
            throw new Error(`Error al programar lavado, error: ${error.message}`)
        }

        const { error: errorUpdate } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'programado' })
            .eq('id', id_detalle_entrada)

        if (errorUpdate) {
            await supabase.from('lavados').delete().eq('id', data[0].id)
            throw new Error(`Error al actualizar estatus de registro, error: ${errorUpdate.message}`)
        }

        return { error: errorUpdate }
    } catch (error) {
        console.error(error)
    }
}

export async function updateWashing(id, updates) {
    try {

        const { error } = await supabase
            .from('lavados')
            .update({ ...updates })
            .eq('id_detalle_entrada', id)

        if (error) {
            throw new Error(`Error al programar lavado, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}
