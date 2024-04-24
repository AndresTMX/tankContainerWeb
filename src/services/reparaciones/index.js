import supabase from "../../supabase";

export async function postRepair(newRepair) {
    try {

        const { error } = await supabase
            .from('reparaciones')
            .insert({ ...newRepair })

        if (error) {
            throw new Error(`Error al insertar nueva reparación , error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}