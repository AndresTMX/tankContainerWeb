import supabase from "../../supabase";

export async function getAllDestinos() {
    try {

        const { error, data } = await supabase
            .from('destinos')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar destinos, ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function createDestino(destino) {
    try {
        const { error } = await supabase
            .from('destinos')
            .insert({ ...destino })

        if (error) {
            throw new Error(`Error al crear nuevo destino, ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function updateDestino(id, updates) {
    try {
        const { error } = await supabase
            .from('destinos')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar destino: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}
