import supabase from "../../supabase";

export async function createMultipleRegisters(arrayRegisters) {
    try {

        const { error } = await supabase
            .from('puerto')
            .insert(arrayRegisters)

        if (error) {
            throw new Error(`Error al cargar registros, error ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function getAllRegistersForStatus(status) {
    try {
        const { error, data } = await supabase
            .from('puerto')
            .select('*')
            .eq('status', status)
            .order('created_at', { ascending: false })

        if (error) {
            throw new Error(`Error al recuperar tanques en puerto, ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function updateRegister(id, updates) {
    try {
        const { error } = await supabase
            .from('puerto')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar tanque, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}