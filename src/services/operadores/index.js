import supabase from "../../supabase";

export async function getAllOperadores() {
    try {
        const { error, data } = await supabase
            .from('operadores')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar operadores, error ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function createOperador(data) {
    try {
        const { error } = await supabase
            .from('operadores')
            .insert({ ...data })

        if (error) {
            throw new Error(`Error al crear nuevo operador`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function deleteOperador(id) {
    try {
        const { error } = await supabase
            .from('operadores')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(`Error al eliminar operador`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function updateOperador(id, updates) {
    try {
        const { error } = await supabase
            .from('operadores')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar operador`)
        }

        return { error }
    } catch (error) {
        console.error(error)

    }
}