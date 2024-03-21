import supabase from "../../supabase";

export async function getAllClientes() {
    try {
        const { error, data } = await supabase
            .from('clientes')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar clientes, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function createNewCliente(data) {
    try {
        const { error } = await supabase
            .from('clientes')
            .insert({ ...data })

        if (error) {
            throw new Error(`Error al crear nuevo cliente, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function updateCliente(id, data) {
    try {
        const { error } = await supabase
            .from('clientes')
            .update({ ...data })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar cliente, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function deleteCliente(id) {
    try {
        const { error } = await supabase
            .from('clientes')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(`Error al eliminar cliente, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}