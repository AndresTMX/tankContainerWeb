import supabase from "../../supabase";

export async function getAllTransportistas() {
    try {
        const { error, data } = await supabase
            .from('transportistas')
            .select('*')
            .order('created_at' , { ascending: true })

        if (error) {
            throw new Error(`Error al recuperar transportistas, error : ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function createTransportista(nameTransportista) {
    try {
        const { error } = await supabase
            .from('transportistas')
            .insert({ name: nameTransportista })

        if (error) {
            throw new Error(`Error al agregar nueva linea transportista, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function updateTransportista(id, nameTransportista) {
    try {
        const { error } = await supabase
            .from('transportistas')
            .update({ name: nameTransportista })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar nueva linea transportista, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function deleteTransportista(id) {
    try {
        const { error } = await supabase
            .from('transportistas')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(`Error al eliminar linea transportista, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}