import supabase from "../../supabase";

export async function getAllUsers() {
    try {

    } catch (error) {

    }
}

export async function updateMetaData(updates) {
    try {

        const { data, error } = await supabase.auth.updateUser({ ...updates })

        if (error) {
            throw new Error(`Error al actualizar datos de usuario, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}